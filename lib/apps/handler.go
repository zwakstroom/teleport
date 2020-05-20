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

package apps

import (
	"context"
	"fmt"
	"net"
	"net/http"

	"github.com/gravitational/oxy/forward"
	"github.com/gravitational/oxy/testutils"
	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/reversetunnel"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"
)

type HandlerConfig struct {
	AuthClient  auth.ClientI
	ProxyClient reversetunnel.Server
	Next        http.Handler
}

func (c *HandlerConfig) CheckAndSetDefaults() error {
	if c.AuthClient == nil {
		return trace.BadParameter("missing auth client")
	}
	if c.ProxyClient == nil {
		return trace.BadParameter("missing proxy client")
	}
	if c.Next == nil {
		return trace.BadParameter("missing next http.Handler")
	}

	return nil
}

type Handler struct {
	*HandlerConfig
}

func NewHandler(config *HandlerConfig) (*Handler, error) {
	if err := config.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	return &Handler{
		HandlerConfig: config,
	}, nil
}

// ServeHTTP will try and find the proxied application that the caller is
// requesting. If any error occurs or the application is not found, the
// request is passed to the next handler (which would be the Web UI).
func (a *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// TODO: This should probably be: GetApp?
	applist, err := a.AuthClient.GetApps(context.TODO(), defaults.Namespace)
	if err != nil {
		//fmt.Printf("--> Failed to get application list: %v.\n", err)
		a.Next.ServeHTTP(w, r)
		return
	}

	var matchedApp services.App

	fmt.Printf("--> attmpting to match r.Host: %v; [%v] apps found.\n", r.Host, len(applist))

	for _, app := range applist {
		//fmt.Printf("--> r.Host: %v, app.GetPublicAddr(): %v.\n", r.Host, app.GetPublicAddr())

		wantHost, _, err := utils.SplitHostPort(app.GetPublicAddr())
		if err != nil {
			//fmt.Printf("--> Failed to parse application hostname: %v: %v.\n", app.GetPublicAddr(), err)
			a.Next.ServeHTTP(w, r)
			return
		}

		gotHost, _, err := utils.SplitHostPort(r.Host)
		if err != nil {
			//	fmt.Printf("--> Failed to parse requested hostname: %v: %v.\n", r.Host, err)
			a.Next.ServeHTTP(w, r)
			return
		}

		//	fmt.Printf("--> gotHost: %v, wantHost: %v.\n", gotHost, wantHost)
		if gotHost == wantHost {
			matchedApp = app
			break

		}
	}
	//fmt.Printf("-->didn't match.\n")

	// If no matching application was found, send the request to the web ui.
	if matchedApp == nil {
		//fmt.Printf("--> Failed to parse requested hostname: %v: %v.\n", r.Host, err)
		a.Next.ServeHTTP(w, r)
		return
	}

	//fmt.Printf("--> matchedApp: %v.\n", matchedApp)

	// Extract cluster name from domain.
	cluster, err := a.ProxyClient.GetSite("example.com")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	//fmt.Printf("--> cluster: %v.\n", cluster)

	//fmt.Printf("--> Attempting to dial: %v.\n", matchedApp.GetHostUUID()+".example.com")

	conn, err := cluster.Dial(reversetunnel.DialParams{
		ServerID: matchedApp.GetHostUUID() + ".example.com",
		ConnType: services.AppTunnel,
	})
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	roundTripper := forward.RoundTripper(newCustomTransport(conn))
	fwd, _ := forward.New(roundTripper)

	//nu, _ := url.Parse(r.URL.String())
	//nu.Scheme = "https"
	//nu.Host = "rusty-gitlab.gravitational.io"
	r.URL = testutils.ParseURI("http://localhost:8081")

	// let us forward this request to another server
	//r.URL = testutils.ParseURI("https://rusty-gitlab.gravitational.io")
	//r.URL = testutils.ParseURI("localhost:8080")

	fmt.Printf("--> forwarding request.\n")
	fwd.ServeHTTP(w, r)
	fmt.Printf("--> forwarding request: done.\n")

	//w.Header().Set("Content-Type", "text/plain")
	//fmt.Fprintf(w, "Welcome to %v.", matchedApp.GetName())
}

type customTransport struct {
	conn net.Conn
}

func newCustomTransport(conn net.Conn) *customTransport {
	return &customTransport{
		conn: conn,
	}
}

func (t *customTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	tr := &http.Transport{
		Dial: func(network string, addr string) (net.Conn, error) {
			return t.conn, nil
		},
	}

	resp, err := tr.RoundTrip(req)
	if err != nil {
		return nil, err
	}

	//if resp.StatusCode == 302 {
	//	u, _ := url.Parse(resp.Header.Get("Location"))
	//	u.Host = "gitlab.proxy.example.com:8080"
	//	//u.Host = "gitlab.proxy.example.com:3080"
	//	u.Scheme = "http"
	//	resp.Header.Set("Location", u.String())
	//	fmt.Printf("--> new resp: %v.\n", u.String())

	//	origCookie := resp.Header.Get("Set-Cookie")
	//	newCookie := strings.Replace(origCookie, ".gravitational.io", ".proxy.example.com", 1)
	//	newCookie = strings.Replace(newCookie, "secure", "", 1)
	//	newCookie = strings.Replace(newCookie, "HttpOnly", "", 1)
	//	resp.Header.Set("Set-Cookie", newCookie)

	//	//for _, v := range resp.Cookies() {
	//	//	v.Domain = ".proxy.example.com"
	//	//}

	//	bb, _ := httputil.DumpResponse(resp, false)
	//	fmt.Printf("--> response: %v.\n", string(bb))

	//	return resp, nil

	//}

	return resp, nil
}
