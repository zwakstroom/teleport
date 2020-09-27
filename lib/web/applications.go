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

// Package web implements web proxy handler that provides
// web interface to view and connect to teleport nodes
package web

import (
	"context"
	"math/rand"
	"net/http"
	"strings"

	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/httplib"
	"github.com/gravitational/teleport/lib/reversetunnel"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/web/ui"

	"github.com/gravitational/trace"
	"github.com/julienschmidt/httprouter"
)

func (h *Handler) siteAppsGet(w http.ResponseWriter, r *http.Request, p httprouter.Params, ctx *SessionContext, site reversetunnel.RemoteSite) (interface{}, error) {
	clt, err := ctx.GetUserClient(site)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	appServers, err := clt.GetApps(r.Context(), defaults.Namespace)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	//proxies, err := clt.GetProxies()
	proxies, err := h.cfg.ProxyClient.GetProxies()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	proxyClusterName, err := h.cfg.ProxyClient.GetClusterName()
	if err != nil && !trace.IsNotFound(err) {
		return nil, trace.Wrap(err)
	}

	proxyName := proxyClusterName.GetClusterName()
	proxyHost, _, err := services.GuessProxyHostAndVersion(proxies)
	if err != nil && !trace.IsNotFound(err) {
		return nil, trace.Wrap(err)
	}
	// remove port number if any
	// TODO(russjones): Handle IPv6.
	proxyHost = strings.Split(proxyHost, ":")[0]
	appClusterName := p.ByName("site")

	return makeResponse(ui.MakeApps(proxyName, proxyHost, appClusterName, appServers))
}

type createAppSessionRequest struct {
	// FQDN is the full qualified domain name of the application
	FQDN string `json:"fqdn"`

	PublicAddr  string `json:"public_addr"`
	ClusterName string `json:"cluster_name"`
}

type createAppSessionResponse struct {
	// CookieValue is aap application cookie value
	CookieValue string `json:"value"`
}

func (h *Handler) createAppSession(w http.ResponseWriter, r *http.Request, p httprouter.Params, ctx *SessionContext) (interface{}, error) {
	var req *createAppSessionRequest
	if err := httplib.ReadJSON(r, &req); err != nil {
		return nil, trace.Wrap(err)
	}

	// Use the information the caller provided to attempt to resolve to an
	// application running within either the root or leaf cluster.
	app, server, clusterName, err := h.resolveRequest(r.Context(), req)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Get a client connected to either to local auth or remote auth with the
	// users identity.
	var userClient auth.ClientI
	if clusterName == h.cfg.DomainName {
		userClient, err = ctx.GetClient()
	} else {
		remoteClient, err := h.cfg.Proxy.GetSite(clusterName)
		if err != nil {
			return nil, trace.Wrap(err)
		}
		userClient, err = ctx.GetUserClient(remoteClient)
		if err != nil {
			return nil, trace.Wrap(err)
		}
	}

	// Attempt to create an application session within whichever cluster the
	// user requested. This requests goes to the root (or leaf) auth cluster
	// where access to the application is checked.
	appSession, err = userClient.CreateAppSession(r.Context(), services.CreateAppSessionRequest{
		PublicAddr: app.PublicAddr,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Get a client connected to the local auth server with the users identity.
	localClient, err := ctx.GetClient()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Create an application web session within the cluster the request arrived.
	webSession, err := localClient.CreateAppWebSession(r.Context(), services.CreateAppWebSessionRequest{
		Username:      ctx.GetUser(),
		ParentSession: ctx.sess.GetName(),
		AppSessionID:  appSession.GetName(),
		ServerID:      server.GetName(),
		ClusterName:   clusterName,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Marshal cookie from application web session.
	appCookie := app.Cookie{
		Username:   webSession.GetUser(),
		ParentHash: webSession.GetParentHash(),
		SessionID:  webSession.GetName(),
	}
	appCookieValue, err := app.EncodeCookie(&appCookie)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &createAppSessionResponse{
		CookieValue: appCookieValue,
	}, nil

	//// TODO(russjones): SOmething of this form works for trusted clusters.
	////fmt.Printf("--> Enter.\n")
	////clusterClient, err := h.cfg.Proxy.GetSite("remote.example.com")
	////if err != nil {
	////	return nil, trace.Wrap(err)
	////}
	//////authClient, err := clientInRemote(clusterClient, h.cfg.ProxyClient, "remote.example.com", ctx.sess)
	////authClient, err := clientInRemote(clusterClient, h.cfg.ProxyClient, "example.com", ctx.sess)
	////if err != nil {
	////	return nil, trace.Wrap(err)
	////}
	////asess, err := authClient.CreateAppSession(r.Context(), services.CreateAppSessionRequest{
	////	//Username:    ctx.sess.GetUser(),
	////	PublicAddr: "whatever.com",
	////	//ClusterName: "remote.example.com",
	////	//SessionID:   ctx.sess.GetName(),
	////})
	////if err != nil {
	////	return nil, trace.Wrap(err)
	////}

	//// Get a client to auth with the identity of the logged in user and use it
	//// to request the creation of an application session for this user.
	//client, err := ctx.GetClient()
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}

	////fmt.Printf("--> fqdn: %v.\n", req.FQDN)
	//////--> fqdn: dumper.example.com:3080.

	//////for app in apps:
	//////  if publicAddr == fqdn:
	//////     found app

	//////appName.publicAddrOfRemoteProxy
	//////publicAddr

	//// TODO(russjones): Pick up expiry from here.
	//_, err = client.CreateAppSession(r.Context(), services.CreateAppSessionRequest{
	//	PublicAddr: "dumper.example.com",
	//	//ClusterName: "example.com",
	//	//SessionID:   ctx.GetWebSession().GetName(),
	//})
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//wsess, err := client.CreateAppWebSession(r.Context(), services.CreateAppWebSessionRequest{
	//	Username:    "rjones",
	//	PublicAddr:  "dumper.example.com",
	//	ClusterName: "example.com",
	//	SessionID:   ctx.sess.GetName(),
	//})
	//if err != nil {
	//	fmt.Printf("--> failed to CreateAppWebSession: %v.\n", err)
	//	return nil, trace.Wrap(err)
	//}

	//appCookie := app.Cookie{
	//	Username:   wsess.GetUser(),
	//	ParentHash: wsess.GetParentHash(),
	//	SessionID:  wsess.GetName(),
	//}

	////appCookie := app.Cookie{
	////	Username:   session.GetUser(),
	////	ParentHash: session.GetParentHash(),
	////	SessionID:  session.GetName(),
	////}

	//appCookieValue, err := app.EncodeCookie(&appCookie)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}

	//return &createAppSessionResponse{
	//	CookieValue: appCookieValue,
	//}, nil
}

func (h *Handler) resolveRequest(ctx context.Context, req *createAppSessionRequest) (*services.App, services.Server, string, error) {
	if req.PublicAddr != "" && req.ClusterName != "" {
		return h.resolveDirect(req.PublicAddr, req.ClusterName)
	}
	return h.resolveFQDN(req.FQDN)
}

func (h *Handler) resolveDirect(ctx context.Context, publicAddr string, clusterName string) (*services.App, services.Server, string, error) {
	clusterClient, err := h.cfg.Proxy.GetSite(clusterName)
	if err != nil {
		return nil, nil, "", trace.Wrap(err)
	}

	authClient, err := clusterClient.GetClient()
	if err != nil {
		return nil, nil, "", trace.Wrap(err)
	}

	app, server, err := h.matchPublicAddr(ctx, authClient, publicAddr)
	if err != nil {
		return nil, nil, "", trace.Wrap(err)
	}

	return app, server, clusterName, nil
}

// resolveFQDN makes a best effort attempt to resolve FQDN to an application
// running a root or leaf cluster.
//
// Known edge cases this function can incorrectly resolve an application exist.
// For example, if you have an application named "acme" within both the root
// and leaf cluster, this method will always return "acme" running within the
// root cluster. Always supply public address and cluster name to
// deterministically resolve an application.
func (h *Handler) resolveFQDN(ctx context.Context, fqdn string) (*services.App, services.Server, string, error) {
	// Try and match FQDN to public address of application within cluster.
	app, server, err := h.match(ctx, h.cfg.ProxyClient, matchPublicAddr(fqdn))
	if err == nil {
		return app, server, h.cfg.DomainName, nil
	}

	// Extract the first subdomain from the FQDN and attempt to use this as the
	// application name.
	appName := strings.Split(fqdn, ".")[0]

	// Try and match application name to an application within the cluster.
	app, server, err := h.match(ctx, h.cfg.ProxyClient, matchName(appName))
	if err == nil {
		return app, server, h.cfg.DomainName, nil
	}

	// Loop over all clusters and try and match application name to an
	// application with the cluster.
	remoteClients, err := h.cfg.Proxy.GetSites()
	if err != nil {
		return nil, nil, "", trace.Wrap(err)
	}
	for _, remoteClient := range remoteClients {
		authClient, err := remoteClient.CachingAccessPoint()
		if err != nil {
			return nil, nil, "", trace.Wrap(err)
		}

		app, server, err := h.match(ctx, authClient, matchName(appName))
		if err == nil {
			return app, server, remoteClient.GetName(), nil
		}
	}

	return nil, nil, "", trace.NotFound("failed to resolve %v to any application within any cluster", fqdn)
}

// match will match an application with the passed in matcher function. Matcher
// functions that can match on public address and name are available.
func (h *Handler) match(ctx context.Context, authClient auth.ClientI, fn matcher) (*services.App, services.Server, error) {
	servers, err := authClient.GetApps(ctx, defaults.Namespace)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}

	var ma []*services.App
	var ms []services.Server

	for _, server := range servers {
		for _, app := range server.GetApps() {
			if fn(app) {
				ma = append(ma, app)
				ms = append(ms, server)
			}
		}
	}

	if len(ma) == 0 {
		return nil, nil, trace.NotFound("%q not found in %q", publicAddr, clusterName)
	}
	index := rand.Intn(len(ma))
	return ma[index], ms[index], nil
}

type matcher func(*services.App) bool

func matchPublicAddr(publicAddr string) matcher {
	return func(app *services.App) bool {
		return app.PublicAddr == publicAddr
	}
}

func matchName(name string) matcher {
	return func(app *services.App) bool {
		return app.Name == name
	}
}

//func (h *Handler) matchPublicAddr(ctx context.Context, authClient auth.ClientI, publicAddr string) (*services.App, services.Server, error) {
//	servers, err := authClient.GetApps(ctx, defaults.Namespace)
//	if err != nil {
//		return nil, nil, trace.Wrap(err)
//	}
//
//	var ma []*services.App
//	var ms []services.Server
//
//	for _, server := range servers {
//		for _, app := range server.GetApps() {
//			if app.PublicAddr == publicAddr {
//				ma = append(ma, app)
//				ms = append(ms, server)
//			}
//		}
//	}
//
//	if len(ma) == 0 {
//		return nil, nil, trace.NotFound("%q not found in %q", publicAddr, clusterName)
//	}
//	index := rand.Intn(len(ma))
//	return ma[index], ms[index], nil
//}

//func clientInRemote(clusterClient reversetunnel.RemoteSite, authClient auth.ClientI, clusterName string, session services.WebSession) (*auth.Client, error) {
//	fmt.Printf("--> Enter clientInRemote.\n")
//	ca, err := authClient.GetCertAuthority(services.CertAuthID{
//		Type: services.HostCA,
//		//	DomainName: clusterName,
//		DomainName: "remote.example.com",
//	}, false)
//	if err != nil {
//		return nil, trace.Wrap(err)
//	}
//
//	certPool, err := services.CertPool(ca)
//	if err != nil {
//		return nil, trace.Wrap(err)
//	}
//	//tlsConfig := utils.TLSConfig(s.cipherSuites)
//	tlsConfig := utils.TLSConfig(nil)
//	tlsCert, err := tls.X509KeyPair(session.GetTLSCert(), session.GetPriv())
//	if err != nil {
//		return nil, trace.Wrap(err, "failed to parse TLS cert and key")
//	}
//	fmt.Printf("--> sending cert: %v.\n", tlsCert)
//	tlsConfig.Certificates = []tls.Certificate{tlsCert}
//	tlsConfig.RootCAs = certPool
//	tlsConfig.ServerName = auth.EncodeClusterName(clusterName)
//
//	conn, err := clusterClient.DialAuthServer()
//	fmt.Printf("--> clusterClient.DialAuthServer: %v.\n", err)
//	if err != nil {
//		return nil, trace.Wrap(err)
//	}
//
//	userClient, err := auth.NewTLSClient(auth.ClientConfig{
//		//Addrs: s.authServers,
//		Dialer: &tmpDialer{
//			conn: conn,
//		},
//		TLS: tlsConfig,
//	})
//	fmt.Printf("--> auth.NewTLSClient: %v.\n", err)
//	if err != nil {
//		return nil, trace.Wrap(err)
//	}
//
//	return userClient, nil
//}
//
//type tmpDialer struct {
//	conn net.Conn
//}
//
//func (t *tmpDialer) DialContext(in context.Context, network, addr string) (net.Conn, error) {
//	return t.conn, nil
//}
