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

package auth

import (
	"context"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/tlsca"
	"github.com/gravitational/trace"
)

func (s *AuthServer) createAppSession(ctx context.Context, checker services.AccessChecker, identity tlsca.Identity, req services.CreateAppSessionRequest) (services.WebSession, error) {
	if err := req.Check(); err != nil {
		return nil, trace.Wrap(err)
	}

	// Fetch the application and check if caller has access.
	app, server, err := s.getApp(ctx, req.PublicAddr)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	err = checker.CheckAccessToApp(server.GetNamespace(), app)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Create a new session for the application.
	session, err := s.NewWebSession(identity.Username, identity.Groups, identity.Traits)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	session.SetType(services.WebSessionSpecV2_App)
	session.SetPublicAddr(req.PublicAddr)
	session.SetParentHash(services.SessionHash(parentSession.GetName()))
	session.SetClusterName(req.ClusterName)
	session.SetExpiryTime(s.clock.Now().Add(checker.AdjustSessionTTL(defaults.MaxCertDuration)))
	//session.SetExpiryTime(s.clock.Now().Add(defaults.CertDuration))

	// Create session in backend.
	err = s.Identity.UpsertAppSession(ctx, session)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return session, nil
}
