/*
Copyright 2020 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package app

import (
	"context"
	"math/rand"
	"net/http"
	"net/url"
	"sync"
	"time"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/tlsca"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/jonboulle/clockwork"

	"github.com/gravitational/oxy/forward"
	"github.com/gravitational/trace"
	"github.com/gravitational/ttlmap"

	"github.com/sirupsen/logrus"
)

type session struct {
	clock clockwork.Clock
	url   *url.URL
	fwd   *forward.Forwarder
}

type sessionCacheConfig struct {
	Clock      clockwork.Clock
	AuthClient auth.ClientI
}

func (c *sessionCacheConfig) CheckAndSetDefaults() error {
	if c.Clock == nil {
		c.Clock = clockwork.NewRealClock()
	}

	if c.AuthClient == nil {
		return trace.BadParameter("auth client missing")
	}

	return nil
}

type sessionCache struct {
	c   *sessionCacheConfig
	log *logrus.Entry

	mu    sync.Mutex
	cache *ttlmap.TTLMap
}

func newSessionCache(config *sessionCacheConfig) (*sessionCache, error) {
	if err := config.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	cache, err := ttlmap.New(defaults.ClientCacheSize)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &sessionCache{
		c: config,
		log: logrus.WithFields(logrus.Fields{
			trace.Component: teleport.ComponentAppProxyCache,
		}),
		cache: cache,
	}, nil
}

func (s *sessionCache) get(ctx context.Context, r *http.Request) (*session, error) {
	// Always look for the existence of a session directly in the backend. This
	// is to ensure that a user can for logout of all sessions by logging out of the Web UI.
	cookieValue, err := extractCookie(r)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	cookie, err := decodeCookie(cookieValue)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	appSession, err := s.c.AuthClient.GetAppSession(ctx, services.GetAppSessionRequest{
		Username:   cookie.Username,
		ParentHash: cookie.ParentHash,
		SessionID:  cookie.SessionID,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// If the session exists in the backend, check if this proxy has locally
	// cached metadata about the session. If it does, return it, otherwise
	// build it and return it.
	session, err := s.cacheGet(cookieValue)
	if err == nil {
		return session, nil
	}
	if !trace.IsNotFound(err) {
		s.log.Debugf("Failed to lookup session in cache: %v.", err)
	}

	// Construct session metadata and put it in the cache.
	sess, err := s.newSession(ctx, cookieValue, appSession)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	ttl := appSession.GetExpiryTime().Sub(s.c.Clock.Now())
	if err := s.cacheSet(cookieValue, sess, ttl); err != nil {
		return nil, trace.Wrap(err)
	}

	return sess, nil
}

func (s *sessionCache) newSession(ctx context.Context, cookieValue string, sess services.WebSession) (*session, error) {
	// Get the application this session is targeting.
	app, _, err := s.getApp(ctx, sess.GetPublicAddr())
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Parse the URI, will be added to each forwarded request.
	u, err := url.Parse(app.URI)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Extract roles, traits, and identity of the user from the certificate.
	cert, err := utils.ParseCertificatePEM(sess.GetTLSCert())
	if err != nil {
		return nil, trace.Wrap(err)
	}
	identity, err := tlsca.FromSubject(cert.Subject, cert.NotAfter)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	roles, _, err := services.ExtractFromIdentity(s.c.AuthClient, identity)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Generate a JWT that can be re-used during the lifetime of this
	// session to pass authentication information to the target application.
	jwt, err := s.c.AuthClient.GenerateAppToken(ctx, services.AppTokenParams{
		Username:   sess.GetUser(),
		Roles:      roles,
		PublicAddr: app.PublicAddr,
		Expires:    sess.GetExpiryTime(),
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Create a HTTP request forwarder that will be used to forward the actual
	// request over the reverse tunnel to the target application.
	fwder := &forwarder{
		jwt: jwt,
		log: s.log,
	}
	fwd, err := forward.New(
		forward.RoundTripper(fwder),
		forward.Rewriter(fwder),
		forward.Logger(s.log))
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &session{
		url: u,
		fwd: fwd,
	}, nil
}

func (s *sessionCache) cacheGet(key string) (*session, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if sess, ok := s.cache.Get(key); ok {
		if se, sok := sess.(*session); sok {
			return se, nil
		}
		return nil, trace.BadParameter("invalid type stored in session cache: %T", sess)
	}
	return nil, trace.NotFound("session not found")
}

// GetApp looks for an application registered for the requested public address
// in the cluster and returns it. In the situation multiple applications match,
// a random selection is returned. This is done on purpose to support HA to
// allow multiple application proxy nodes to be run and if one is down, at
// least the application can be accessible on the other.
func (s *sessionCache) getApp(ctx context.Context, publicAddr string) (*services.App, services.Server, error) {
	var appMatch []*services.App
	var serverMatch []services.Server

	servers, err := s.c.AuthClient.GetApps(ctx, defaults.Namespace)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}
	for _, server := range servers {
		for _, a := range server.GetApps() {
			if a.PublicAddr == publicAddr {
				appMatch = append(appMatch, a)
				serverMatch = append(serverMatch, server)
			}
		}
	}

	if len(appMatch) == 0 {
		return nil, nil, trace.NotFound("%q not found", publicAddr)
	}
	index := rand.Intn(len(appMatch))
	return appMatch[index], serverMatch[index], nil
}

func (s *sessionCache) cacheSet(key string, value *session, ttl time.Duration) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if err := s.cache.Set(key, value, ttl); err != nil {
		return trace.Wrap(err)
	}
	return nil
}

type forwarder struct {
	jwt string
	log *logrus.Entry
}

func (f *forwarder) RoundTrip(r *http.Request) (*http.Response, error) {
	resp, err := http.DefaultTransport.RoundTrip(r)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	f.log.Debugf("Proxied requests: %v %v.", resp.StatusCode, r.URL.Path)
	return resp, nil
}

func (f *forwarder) Rewrite(r *http.Request) {
	// Add in JWT headers.
	r.Header.Add("x-teleport-jwt-assertion", f.jwt)
	r.Header.Add("Cf-access-token", f.jwt)

	// Remove the application specific session cookie from the header. This is
	// done by first wiping out the "Cookie" header then adding back all cookies
	// except the Teleport application specific session cookie. This appears to
	// be the best way to serialize cookies.
	r.Header.Del("Cookie")
	for _, cookie := range r.Cookies() {
		if cookie.Name == cookieName {
			continue
		}
		r.AddCookie(cookie)
	}
}
