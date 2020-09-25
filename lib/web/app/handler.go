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

// Package app connections to applications over a reverse tunnel and forwards
// HTTP requests to them.
package app

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/reversetunnel"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/jonboulle/clockwork"

	"github.com/gravitational/trace"

	"github.com/sirupsen/logrus"
)

type RoutingRequest struct {
	PublicAddr  string `json:"public_addr"`
	Certificate []byte `json:"certificate"`
}

type HandlerConfig struct {
	Clock       clockwork.Clock
	AuthClient  auth.ClientI
	ProxyClient reversetunnel.Server
	ClusterName string
}

func (c *HandlerConfig) CheckAndSetDefaults() error {
	if c.Clock == nil {
		c.Clock = clockwork.NewRealClock()
	}

	if c.AuthClient == nil {
		return trace.BadParameter("auth client missing")
	}
	if c.ProxyClient == nil {
		return trace.BadParameter("proxy client missing")
	}
	if c.ClusterName == "" {
		return trace.BadParameter("cluster name is missing")
	}

	return nil
}

type Handler struct {
	c   *HandlerConfig
	log *logrus.Entry

	sessions *sessionCache
}

func NewHandler(config *HandlerConfig) (*Handler, error) {
	if err := config.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	sessionCache, err := newSessionCache(&sessionCacheConfig{
		Clock:       config.Clock,
		AuthClient:  config.AuthClient,
		ProxyClient: config.ProxyClient,
		ClusterName: config.ClusterName,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &Handler{
		c: config,
		log: logrus.WithFields(logrus.Fields{
			trace.Component: teleport.ComponentAppProxy,
		}),
		sessions: sessionCache,
	}, nil
}

// ForwardToApp checks if the request is bound for the application handler.
// Used by "ServeHTTP" within the "web" package to make a decision if the
// request should be processed by the UI or forwarded to an application.
func (h *Handler) ForwardToApp(r *http.Request) bool {
	fmt.Printf("--> inbound request for: %v.\n", r.Host)
	if r.Host == "dumper.example.com:3080" {
		return true
	}
	return false

	//// The only unauthenticated endpoint supported is the special
	//// "x-teleport-auth" endpoint. If the request is coming to this special
	//// endpoint, it should be processed by application handlers.
	//if r.URL.Path == "/x-teleport-auth" {
	//	return true
	//}

	//// Check if an application specific cookie exists. If it exists, forward the
	//// request to an application handler otherwise allow the UI to handle it.
	//_, err := r.Cookie(cookieName)
	//if err != nil {
	//	return false
	//}
	//return true
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//// If the target is an application but it hits the special "x-teleport-auth"
	//// endpoint, then perform redirect authentication logic.
	//if r.URL.Path == "/x-teleport-auth" {
	//	if err := h.handleFragment(w, r); err != nil {
	//		h.log.Warnf("Fragment authentication failed: %v.", err)
	//		http.Error(w, "internal service error", 500)
	//		return
	//	}
	//}

	// Authenticate request by looking for an existing session. If a session
	// does not exist, redirect the caller to the login screen.
	session, err := h.authenticate(r)
	if err != nil {
		h.log.Warnf("Authentication failed: %v.", err)
		http.Error(w, "internal service error", 500)
		return
	}

	h.forward(w, r, session)
}

type fragmentRequest struct {
	CookieValue string `json:"cookie_value"`
}

func (h *Handler) handleFragment(w http.ResponseWriter, r *http.Request) error {
	switch r.Method {
	case http.MethodGet:
		fmt.Fprintf(w, js)
	case http.MethodPost:
		var req fragmentRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			return trace.Wrap(err)
		}

		// Validate that the session exists.
		if _, err := h.sessions.get(r.Context(), req.CookieValue); err != nil {
			return trace.Wrap(err)
		}

		// Set the "Set-Cookie" header on the response.
		http.SetCookie(w, &http.Cookie{
			Name:     cookieName,
			Value:    req.CookieValue,
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteLaxMode,
		})

		// Set additional security headers. In the first run, only set strict
		// transport security. In the future we can add other headers that make sense.
		w.Header().Add("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
	default:
		return trace.BadParameter("unsupported method: %q", r.Method)
	}
	return nil
}

func (h *Handler) authenticate(r *http.Request) (*session, error) {
	//// Extract the session cookie from the *http.Request.
	//cookieValue, err := extractCookie(r)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}

	cookie, err := parseCookie(r)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	proxyClient, err := h.c.ProxyClient.GetSite(cookie.ClusterName)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	authClient, err := proxyClient.CachingAccessPoint()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	session, err := authClient.GetAppSession()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	app, server, err := s.GetApp(session.GetAppName())
	if err != nil {
		return nil, trace.Wrap(err)
	}

	pool, err := h.getPool(server.GetName())
	if err != nil {
		return nil, trace.Wrap(err)
	}

	conn, err := pool.Get()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	//// Check the cache for an authenticated session.
	//session, err := h.sessions.get(r.Context(), cookieValue)
	//session, err := h.sessions.tmp()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return session, nil
}

// forward will update the URL on the request and then forward the request to
// the target. If an error occurs, the error handler attached to the session
// is called.
func (h *Handler) forward(w http.ResponseWriter, r *http.Request, s *session) {
	// TODO(russjones): Can this value be anything? Because we use a customer
	// dialer here and this will be re-written by the application proxy node.
	r.URL = s.url
	s.fwd.ServeHTTP(w, r)
}

func extractAppName(r *http.Request) (string, error) {
	requestedHost, err := utils.Host(r.Host)
	if err != nil {
		return "", trace.Wrap(err)
	}

	parts := strings.FieldsFunc(requestedHost, func(c rune) bool {
		return c == '.'
	})
	if len(parts) == 0 {
		return "", trace.BadParameter("invalid host header: %v", requestedHost)
	}

	return parts[0], nil
}
