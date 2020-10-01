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
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net"
	"net/http"
	"net/url"
	"strings"

	"github.com/gravitational/oxy/forward"
	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/httplib"
	"github.com/gravitational/teleport/lib/reversetunnel"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"

	"github.com/jonboulle/clockwork"
	"github.com/sirupsen/logrus"
)

type HandlerConfig struct {
	Clock       clockwork.Clock
	AccessPoint auth.AccessPoint
	ProxyClient reversetunnel.Server
}

func (c *HandlerConfig) CheckAndSetDefaults() error {
	if c.Clock == nil {
		c.Clock = clockwork.NewRealClock()
	}

	if c.AccessPoint == nil {
		return trace.BadParameter("auth client missing")
	}
	if c.ProxyClient == nil {
		return trace.BadParameter("proxy client missing")
	}

	return nil
}

type Handler struct {
	c   *HandlerConfig
	log *logrus.Entry
}

func NewHandler(config *HandlerConfig) (*Handler, error) {
	if err := config.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	return &Handler{
		c: config,
		log: logrus.WithFields(logrus.Fields{
			trace.Component: teleport.ComponentAppProxy,
		}),
	}, nil
}

// ForwardToApp checks if the request is bound for the application handler.
// Used by "ServeHTTP" within the "web" package to make a decision if the
// request should be processed by the UI or forwarded to an application.
func (h *Handler) ForwardToApp(r *http.Request) bool {
	// The only unauthenticated endpoint supported is the special
	// "x-teleport-auth" endpoint. If the request is coming to this special
	// endpoint, it should be processed by application handlers.
	if r.URL.Path == "/x-teleport-auth" {
		return true
	}

	// Check if an application specific cookie exists. If it exists, forward the
	// request to an application handler otherwise allow the UI to handle it.
	_, err := r.Cookie(cookieName)
	if err != nil {
		return false
	}
	return true
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// If the target is an application but it hits the special "x-teleport-auth"
	// endpoint, then perform redirect authentication logic.
	if r.URL.Path == "/x-teleport-auth" {
		if err := h.handleFragment(w, r); err != nil {
			h.log.Warnf("Fragment authentication failed: %v.", err)
			http.Error(w, "internal service error", 500)
			return
		}
	}

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
		setRedirectPageHeaders(w.Header())
		fmt.Fprintf(w, js)
	case http.MethodPost:
		httplib.SetNoCacheHeaders(w.Header())
		var req fragmentRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			return trace.Wrap(err)
		}

		// validate that the session exists.
		cookie, err := decodeCookie(req.CookieValue)
		if err != nil {
			return trace.Wrap(err)
		}
		_, err = h.c.AccessPoint.GetAppWebSession(r.Context(), services.GetAppWebSessionRequest{
			Username:   cookie.Username,
			ParentHash: cookie.ParentHash,
			SessionID:  cookie.SessionID,
		})
		if err != nil {
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

	default:
		return trace.BadParameter("unsupported method: %q", r.Method)
	}
	return nil
}

func (h *Handler) authenticate(r *http.Request) (services.WebSession, error) {
	// Extract the session cookie from the *http.Request.
	cookieValue, err := extractCookie(r)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	cookie, err := decodeCookie(cookieValue)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	session, err := h.c.AccessPoint.GetAppWebSession(r.Context(), services.GetAppWebSessionRequest{
		Username:   cookie.Username,
		ParentHash: cookie.ParentHash,
		SessionID:  cookie.SessionID,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return session, nil
}

// forward will update the URL on the request and then forward the request to
// the target. If an error occurs, the error handler attached to the session
// is called.
func (h *Handler) forward(w http.ResponseWriter, r *http.Request, session services.WebSession) {
	//_, server, err := h.getApp(r.Context(), session.GetPublicAddr(), session.GetClusterName())
	//if err != nil {
	//	http.Error(w, "internal service error", 500)
	//	return
	//}

	// Get a connection through the reverse tunnel to the target application.
	clusterClient, err := h.c.ProxyClient.GetSite(session.GetClusterName())
	if err != nil {
		http.Error(w, "internal service error", 500)
		return
	}
	conn, err := clusterClient.Dial(reversetunnel.DialParams{
		//ServerID: strings.Join([]string{server.GetName(), session.GetClusterName()}, "."),
		ServerID: strings.Join([]string{session.GetServerID(), session.GetClusterName()}, "."),
		ConnType: services.AppTunnel,
	})
	if err != nil {
		http.Error(w, "internal service error", 500)
		return
	}

	// Create a HTTP request forwarder that will be used to forward the actual
	// request over the reverse tunnel to the target application.
	fwdHandler := &forwardHandler{
		conn:      conn,
		sessionID: session.GetSessionID(),
	}
	fwd, err := forward.New(
		forward.RoundTripper(fwdHandler),
		forward.Rewriter(fwdHandler),
		forward.Logger(h.log))
	if err != nil {
		http.Error(w, "internal service error", 500)
		return
	}

	r.URL, err = url.Parse("http://nowhere")
	if err != nil {
		http.Error(w, "internal service error", 500)
		return
	}
	fwd.ServeHTTP(w, r)
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

// ResolveFQDN returns FQDN of the application based on proxy parameters
func ResolveFQDN(proxyName string, proxyHost string, appClusterName string, app services.App) string {
	// use application publicAdd if running on proxy
	isProxyCluster := proxyName == appClusterName
	if isProxyCluster && app.PublicAddr != "" {
		return app.PublicAddr
	}

	if proxyHost != "" {
		return fmt.Sprintf("%v.%v", app.Name, proxyHost)
	}

	return fmt.Sprintf("%v.%v", app.Name, appClusterName)
}

// getApp looks for an application registered for the requested public address
// in the cluster and returns it. In the situation multiple applications match,
// a random selection is returned. This is done on purpose to support HA to
// allow multiple application proxy nodes to be run and if one is down, at
// least the application can be accessible on the other.
func (h *Handler) getApp(ctx context.Context, publicAddr string, clusterName string) (*services.App, services.Server, error) {
	var appMatch []*services.App
	var serverMatch []services.Server

	proxyClient, err := h.c.ProxyClient.GetSite(clusterName)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}

	authClient, err := proxyClient.CachingAccessPoint()
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}

	servers, err := authClient.GetApps(ctx, defaults.Namespace)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}
	for _, server := range servers {
		for _, a := range server.GetApps() {
			//if a.PublicAddr == publicAddr {
			host, _, _ := net.SplitHostPort(a.PublicAddr)
			if host == publicAddr {
				appMatch = append(appMatch, a)
				serverMatch = append(serverMatch, server)
			}
		}
	}

	if len(appMatch) == 0 {
		return nil, nil, trace.NotFound("%q not found in %q", publicAddr, clusterName)
	}
	index := rand.Intn(len(appMatch))
	return appMatch[index], serverMatch[index], nil
}

type forwardHandler struct {
	conn      net.Conn
	sessionID string
}

func (f *forwardHandler) RoundTrip(r *http.Request) (*http.Response, error) {
	tr := &http.Transport{
		DialContext:           f.dialContext,
		ResponseHeaderTimeout: defaults.DefaultDialTimeout,
		MaxIdleConns:          defaults.HTTPMaxIdleConns,
		MaxIdleConnsPerHost:   defaults.HTTPMaxIdleConnsPerHost,
		MaxConnsPerHost:       defaults.HTTPMaxConnsPerHost,
		IdleConnTimeout:       defaults.HTTPIdleTimeout,
	}
	resp, err := tr.RoundTrip(r)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return resp, nil
}

func (f *forwardHandler) dialContext(ctx context.Context, network string, addr string) (net.Conn, error) {
	return f.conn, nil
}

func (f *forwardHandler) Rewrite(r *http.Request) {
	r.Header.Set("x-teleport-session-id", f.sessionID)

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

// newTransport creates a http.RoundTripper that uses the reverse tunnel
// subsystem to build the connection. This allows re-use of the transports
// connection pooling logic instead of needing to write and maintain our own.
func newTransport(clusterClient reversetunnel.RemoteSite) (http.RoundTripper, error) {
	// Clone the default transport to pick up sensible defaults.
	defaultTransport, ok := http.DefaultTransport.(*http.Transport)
	if !ok {
		return nil, trace.BadParameter("invalid transport type %T", http.DefaultTransport)
	}
	tr := defaultTransport.Clone()

	// Increase the size of the transports connection pool. This substantially
	// improves the performance of Teleport under load as it reduces the number
	// of TLS handshakes performed.
	tr.MaxIdleConns = defaults.HTTPMaxIdleConns
	tr.MaxIdleConnsPerHost = defaults.HTTPMaxIdleConnsPerHost

	// Set IdleConnTimeout on the transport, this defines the maximum amount of
	// time before idle connections are closed. Leaving this unset will lead to
	// connections open forever and will cause memory leaks in a long running
	// process.
	tr.IdleConnTimeout = defaults.HTTPIdleTimeout

	// The address field is always formatted as serverUUID.clusterName allowing
	// the connection pool maintained by the transport to differentiate
	// connections to different application proxy hosts.
	tr.DialContext = func(ctx context.Context, network string, addr string) (net.Conn, error) {
		conn, err := clusterClient.Dial(reversetunnel.DialParams{
			ServerID: addr,
			ConnType: services.AppTunnel,
		})
		if err != nil {
			return nil, trace.Wrap(err)
		}
		return conn, nil
	}

	return tr, nil
}
