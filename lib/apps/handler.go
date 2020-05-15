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
	"net/http"

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
		log.Debugf("Failed to get application list: %v.", err)
		a.Next.ServeHTTP(w, r)
		return
	}

	var matchedApp services.App

	for _, app := range applist {
		wantHost, _, err := utils.SplitHostPort(app.GetPublicAddr())
		if err != nil {
			log.Debugf("Failed to parse application hostname: %v: %v.", app.GetPublicAddr(), err)
			a.Next.ServeHTTP(w, r)
			return
		}

		gotHost, _, err := utils.SplitHostPort(r.Host)
		if err != nil {
			log.Debugf("Failed to parse requested hostname: %v: %v.", r.Host, err)
			a.Next.ServeHTTP(w, r)
			return
		}

		fmt.Printf("--> gotHost: %v, wantHost: %v.\n", gotHost, wantHost)
		if gotHost == wantHost {
			matchedApp = app
			break

		}
	}

	// If no matching application was found, send the request to the web ui.
	if matchedApp == nil {
		log.Debugf("Failed to parse requested hostname: %v: %v.", r.Host, err)
		a.Next.ServeHTTP(w, r)
		return
	}

	// Extract cluster name from domain.
	cluster, err := a.ProxyClient.GetSite("example.com")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	// TODO get this to actually work
	/*
		conn, err := cluster.Dial(&reversetunnel.DialParams{})
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
	*/

	// TODO get this to actually work
	/*
		roundTripper := forward.RoundTripper(newCustomTransport(conn))
		fwd, _ := forward.New(roundTripper)

		nu, _ := url.Parse(r.URL.String())
		nu.Scheme = "https"
		nu.Host = "rusty-gitlab.gravitational.io"

		// let us forward this request to another server
		r.URL = nu //testutils.ParseURI(nu.String())
		//r.URL = testutils.ParseURI("https://rusty-gitlab.gravitational.io")
		//r.URL = testutils.ParseURI("localhost:8080")

		fwd.ServeHTTP(w, r)
	*/

	//w.Header().Set("Content-Type", "text/plain")
	//fmt.Fprintf(w, "Welcome to %v.", matchedApp.GetName())
}
