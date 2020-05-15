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
	"fmt"
	"net/http"
)

type appsHandler struct {
	next http.Handler
}

func WrapHandler(next http.Handler) *appsHandler {
	return &appsHandler{
		next: next,
	}
}

func (a *appsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("--> r.Host: %v.\n", r.Host)
	if r.Host == "dumper.proxy.example.com:3080" {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintf(w, "Welcome to header dumper.")
		return
	}

	a.next.ServeHTTP(w, r)
}
