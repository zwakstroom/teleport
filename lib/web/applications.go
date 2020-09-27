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
	"crypto/tls"
	"fmt"
	"net"
	"net/http"
	"strings"

	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/httplib"
	"github.com/gravitational/teleport/lib/reversetunnel"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/gravitational/teleport/lib/web/app"
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

func (h *Handler) createAppSession(w http.ResponseWriter, r *http.Request, p httprouter.Params, ctx *SessionContext) (interface{}, error) {
	var req *createAppSessionRequest
	if err := httplib.ReadJSON(r, &req); err != nil {
		return nil, trace.Wrap(err)
	}

	// TODO(russjones): SOmething of this form works for trusted clusters.
	//fmt.Printf("--> Enter.\n")
	//clusterClient, err := h.cfg.Proxy.GetSite("remote.example.com")
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	////authClient, err := clientInRemote(clusterClient, h.cfg.ProxyClient, "remote.example.com", ctx.sess)
	//authClient, err := clientInRemote(clusterClient, h.cfg.ProxyClient, "example.com", ctx.sess)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//asess, err := authClient.CreateAppSession(r.Context(), services.CreateAppSessionRequest{
	//	//Username:    ctx.sess.GetUser(),
	//	PublicAddr: "whatever.com",
	//	//ClusterName: "remote.example.com",
	//	//SessionID:   ctx.sess.GetName(),
	//})
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}

	// Get a client to auth with the identity of the logged in user and use it
	// to request the creation of an application session for this user.
	client, err := ctx.GetClient()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	//fmt.Printf("--> fqdn: %v.\n", req.FQDN)
	////--> fqdn: dumper.example.com:3080.

	////for app in apps:
	////  if publicAddr == fqdn:
	////     found app

	////appName.publicAddrOfRemoteProxy
	////publicAddr

	// TODO(russjones): Pick up expiry from here.
	_, err = client.CreateAppSession(r.Context(), services.CreateAppSessionRequest{
		PublicAddr: "dumper.example.com",
		//ClusterName: "example.com",
		//SessionID:   ctx.GetWebSession().GetName(),
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	wsess, err := client.CreateAppWebSession(r.Context(), services.CreateAppWebSessionRequest{
		Username:    "rjones",
		PublicAddr:  "dumper.example.com",
		ClusterName: "example.com",
		SessionID:   ctx.sess.GetName(),
	})
	if err != nil {
		fmt.Printf("--> failed to CreateAppWebSession: %v.\n", err)
		return nil, trace.Wrap(err)
	}

	appCookie := app.Cookie{
		Username:   wsess.GetUser(),
		ParentHash: wsess.GetParentHash(),
		SessionID:  wsess.GetName(),
	}

	//appCookie := app.Cookie{
	//	Username:   session.GetUser(),
	//	ParentHash: session.GetParentHash(),
	//	SessionID:  session.GetName(),
	//}

	appCookieValue, err := app.EncodeCookie(&appCookie)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &createAppSessionResponse{
		CookieValue: appCookieValue,
	}, nil
}

type createAppSessionResponse struct {
	// CookieValue is aap application cookie value
	CookieValue string `json:"value"`
}

type createAppSessionRequest struct {
	// FQDN is the full qualified domain name of the application
	FQDN string `json:"fqdn"`
	// ClusterName is the cluster within which the application is running.
	ClusterName string `json:"cluster_name"`
}

func clientInRemote(clusterClient reversetunnel.RemoteSite, authClient auth.ClientI, clusterName string, session services.WebSession) (*auth.Client, error) {
	fmt.Printf("--> Enter clientInRemote.\n")
	ca, err := authClient.GetCertAuthority(services.CertAuthID{
		Type: services.HostCA,
		//	DomainName: clusterName,
		DomainName: "remote.example.com",
	}, false)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	certPool, err := services.CertPool(ca)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	//tlsConfig := utils.TLSConfig(s.cipherSuites)
	tlsConfig := utils.TLSConfig(nil)
	tlsCert, err := tls.X509KeyPair(session.GetTLSCert(), session.GetPriv())
	if err != nil {
		return nil, trace.Wrap(err, "failed to parse TLS cert and key")
	}
	fmt.Printf("--> sending cert: %v.\n", tlsCert)
	tlsConfig.Certificates = []tls.Certificate{tlsCert}
	tlsConfig.RootCAs = certPool
	tlsConfig.ServerName = auth.EncodeClusterName(clusterName)

	conn, err := clusterClient.DialAuthServer()
	fmt.Printf("--> clusterClient.DialAuthServer: %v.\n", err)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	userClient, err := auth.NewTLSClient(auth.ClientConfig{
		//Addrs: s.authServers,
		Dialer: &tmpDialer{
			conn: conn,
		},
		TLS: tlsConfig,
	})
	fmt.Printf("--> auth.NewTLSClient: %v.\n", err)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return userClient, nil
}

type tmpDialer struct {
	conn net.Conn
}

func (t *tmpDialer) DialContext(in context.Context, network, addr string) (net.Conn, error) {
	return t.conn, nil
}
