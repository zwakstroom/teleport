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
	"fmt"
	"math/rand"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/jwt"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/gravitational/trace"
)

func (s *AuthServer) CreateAppSession(ctx context.Context, req services.CreateAppSessionRequest, user services.User, checker services.AccessChecker) (services.AppSession, error) {
	if err := req.Check(); err != nil {
		return nil, trace.Wrap(err)
	}

	// Fetch the application the caller is requesting.
	app, server, err := s.getApp(ctx, req.PublicAddr)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Check if the caller has access to the requested application.
	if err := checker.CheckAccessToApp(server.GetNamespace(), app); err != nil {
		// TODO(russjones): Emit an audit event here.
		log.Warnf("Access to %v denied: %v.", err)
		return nil, trace.AccessDenied("access denied")
	}

	// TODO(russjones): This ends up being 30 hours, does this make sense?
	expires := s.clock.Now().Add(checker.AdjustSessionTTL(defaults.MaxCertDuration))

	// Generate a JWT that can be re-used during the lifetime of this
	// session to pass authentication information to the target application.
	jwt, err := s.generateAppToken(tokenRequest{
		username:   user.GetName(),
		roles:      user.GetRoles(),
		publicAddr: req.PublicAddr,
		expires:    expires,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Create a new application session.
	session, err := services.NewAppSession(services.AppSessionSpecV3{
		PublicAddr: req.PublicAddr,
		Username:   user.GetName(),
		Roles:      user.GetRoles(),
		JWT:        jwt,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	session.SetExpiry(expires)
	if err := s.UpsertAppSession(ctx, session); err != nil {
		return nil, trace.Wrap(err)
	}

	return session, nil
}

func (s *AuthServer) CreateAppWebSession(ctx context.Context, req services.CreateAppWebSessionRequest, user services.User, checker services.AccessChecker) (services.WebSession, error) {
	// Check that a matching web session exists in the backend.
	parentSession, err := s.GetWebSession(req.Username, req.ParentSession)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	//	// Create a new session for the application.
	//	session, err := s.NewAppSession("rjones", []string{"admin"}, map[string][]string{"logins": []string{"foo"}})
	//	if err != nil {
	//		return nil, trace.Wrap(err)
	//	}
	//	// TODO(russjones): set session id and server id here.
	//	//session.SetType(services.WebSessionSpecV2_App)
	//	//session.SetPublicAddr(req.PublicAddr)
	//	session.SetParentHash(services.SessionHash(parentSession.GetName()))
	//	session.SetClusterName(req.ClusterName)
	//
	//	// TODO(russjones): This should be passed in the request and shoud be picked from appsession.
	//	session.SetExpiryTime(s.clock.Now().Add(defaults.CertDuration))

	//user, err := s.GetUser(username, false)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//checker, err := services.FetchRoles(roles, s.Access, traits)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}

	// TODO(russjones): Does this TTL make sense, is it 30 hours?
	fmt.Printf("--> req.Expires: %v.\n", req.Expires)
	fmt.Printf("--> s.clock.Now(): %v.\n", s.clock.Now())
	fmt.Printf("--> Requesting ttl: %v.\n", req.Expires.Sub(s.clock.Now()))

	// Generate certificate for this session.
	privateKey, publicKey, err := s.GetNewKeyPairFromPool()
	if err != nil {
		return nil, trace.Wrap(err)
	}
	certs, err := s.generateUserCert(certRequest{
		user:      user,
		publicKey: publicKey,
		checker:   checker,
		// TODO(russjones): What should the traits be?
		traits:          map[string][]string{"logins": []string{"foo"}},
		ttl:             req.Expires.Sub(s.clock.Now()),
		overrideRoleTTL: true,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Create session.
	sessionID, err := utils.CryptoRandomHex(SessionTokenBytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	session := services.NewWebSession(sessionID, services.KindAppWebSession, services.WebSessionSpecV2{
		User:    req.Username,
		Priv:    privateKey,
		Pub:     certs.ssh,
		TLSCert: certs.tls,
		Expires: req.Expires,
		// Set web application specific fields.
		ParentHash:  services.SessionHash(parentSession.GetName()),
		ServerID:    req.ServerID,
		ClusterName: req.ClusterName,
		SessionID:   req.AppSessionID,
	})
	if err = s.Identity.UpsertAppWebSession(ctx, session); err != nil {
		return nil, trace.Wrap(err)
	}

	fmt.Printf("--> Successfully created appwebsession.\n")

	return session, nil
}

// getApp looks for an application registered for the requested public address
// in the cluster and returns it. In the situation multiple applications match,
// a random selection is returned. This is done on purpose to support HA to
// allow multiple application proxy nodes to be run and if one is down, at
// least the application can be accessible on the other.
//
// In the future this function should be updated to keep state on application
// servers that are down and to not route requests to that server.
func (s *AuthServer) getApp(ctx context.Context, publicAddr string) (*services.App, services.Server, error) {
	var am []*services.App
	var sm []services.Server

	servers, err := s.GetApps(ctx, defaults.Namespace)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}
	for _, server := range servers {
		for _, app := range server.GetApps() {
			if app.PublicAddr == publicAddr {
				am = append(am, app)
				sm = append(sm, server)
			}
		}
	}

	if len(am) == 0 {
		return nil, nil, trace.NotFound("%q not found", publicAddr)
	}
	index := rand.Intn(len(am))
	return am[index], sm[index], nil
}

type tokenRequest struct {
	username   string
	roles      []string
	publicAddr string
	expires    time.Time
}

func (s *AuthServer) generateAppToken(r tokenRequest) (string, error) {
	// Get the CA with which this JWT will be signed.
	clusterName, err := s.GetDomainName()
	if err != nil {
		return "", trace.Wrap(err)
	}
	ca, err := s.Trust.GetCertAuthority(services.CertAuthID{
		Type:       services.JWTSigner,
		DomainName: clusterName,
	}, true)
	if err != nil {
		return "", trace.Wrap(err)
	}

	// Fetch the signing key and sign the claims.
	privateKey, err := ca.JWTSigner()
	if err != nil {
		return "", trace.Wrap(err)
	}
	token, err := privateKey.Sign(jwt.SignParams{
		Username: r.username,
		Roles:    r.roles,
		AppName:  r.publicAddr,
		Expires:  r.expires,
	})
	if err != nil {
		return "", trace.Wrap(err)
	}

	return token, nil
}

//func (s *AuthServer) createAppSession(ctx context.Context, identity tlsca.Identity, req services.CreateAppSessionRequest) (services.WebSession, error) {
//	if err := req.Check(); err != nil {
//		return nil, trace.Wrap(err)
//	}
//
//	// Check that a matching web session exists in the backend.
//	parentSession, err := s.GetWebSession(identity.Username, req.SessionID)
//	if err != nil {
//		return nil, trace.Wrap(err)
//	}
//	//if subtle.ConstantTimeCompare([]byte(parentSession.GetBearerToken()), []byte(req.BearerToken)) == 0 {
//	//	return nil, trace.BadParameter("invalid session")
//	//}
//
//	// Create a new session for the application.
//	session, err := s.NewWebSession(identity.Username, identity.Groups, identity.Traits)
//	if err != nil {
//		return nil, trace.Wrap(err)
//	}
//	session.SetType(services.WebSessionSpecV2_App)
//	session.SetPublicAddr(req.PublicAddr)
//	session.SetParentHash(services.SessionHash(parentSession.GetName()))
//	session.SetClusterName(req.ClusterName)
//
//	// TODO(russjones): The proxy should use it's access to the AccessPoint of
//	// the remote host to provide the maximum length of the session here.
//	// However, enforcement of that session length should occur in lib/srv/app.
//	session.SetExpiryTime(s.clock.Now().Add(defaults.CertDuration))
//
//	// Create session in backend.
//	err = s.Identity.UpsertAppSession(ctx, session)
//	if err != nil {
//		return nil, trace.Wrap(err)
//	}
//
//	return session, nil
//}
