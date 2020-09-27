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

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/wrappers"
	"github.com/gravitational/trace"
)

func (s *AuthServer) CreateAppWebSession(ctx context.Context, req services.CreateAppWebSessionRequest) (services.WebSession, error) {
	// Check that a matching web session exists in the backend.
	parentSession, err := s.GetWebSession("rjones", req.SessionID)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	//if subtle.ConstantTimeCompare([]byte(parentSession.GetBearerToken()), []byte(req.BearerToken)) == 0 {
	//	return nil, trace.BadParameter("invalid session")
	//}

	// Create a new session for the application.
	session, err := s.NewAppSession("rjones", []string{"admin"}, map[string][]string{"logins": []string{"foo"}})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	// TODO(russjones): set session id and server id here.
	//session.SetType(services.WebSessionSpecV2_App)
	//session.SetPublicAddr(req.PublicAddr)
	session.SetParentHash(services.SessionHash(parentSession.GetName()))
	session.SetClusterName(req.ClusterName)

	// TODO(russjones): This should be passed in the request and shoud be picked from appsession.
	session.SetExpiryTime(s.clock.Now().Add(defaults.CertDuration))

	// Create session in backend.
	err = s.Identity.UpsertAppWebSession(ctx, session)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return session, nil
}

func (s *AuthServer) CreateAppSession(ctx context.Context, req services.CreateAppSessionRequest) (services.AppSession, error) {
	fmt.Printf("--> Okay done!.\n")
	return nil, nil
	//// TODO(russjones): Check if access is allowed.
	//session, err := services.NewAppSession("123", services.AppSessionSpecV3{
	//	PublicAddr: req.PublicAddr,
	//	Username:   "this-comes-from-identity",
	//	Roles:      []string{"these-come-from-roles"},
	//})
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}

	//if err := s.UpsertAppSession(ctx, session); err != nil {
	//	return nil, trace.Wrap(err)
	//}

	//return session, nil
}

func (s *AuthServer) NewAppSession(username string, roles []string, traits wrappers.Traits) (services.WebSession, error) {
	return nil, nil
	//user, err := s.GetUser(username, false)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//checker, err := services.FetchRoles(roles, s.Access, traits)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}

	//priv, pub, err := s.GetNewKeyPairFromPool()
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//sessionTTL := checker.AdjustSessionTTL(defaults.CertDuration)
	//certs, err := s.generateUserCert(certRequest{
	//	user:      user,
	//	ttl:       sessionTTL,
	//	publicKey: pub,
	//	checker:   checker,
	//	traits:    traits,
	//})
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//token, err := utils.CryptoRandomHex(SessionTokenBytes)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//bearerToken, err := utils.CryptoRandomHex(SessionTokenBytes)
	//if err != nil {
	//	return nil, trace.Wrap(err)
	//}
	//bearerTokenTTL := utils.MinTTL(sessionTTL, BearerTokenTTL)
	//return services.NewWebSession(token, services.KindWebSession, services.WebSessionSpecV2{
	//	User:               user.GetName(),
	//	Priv:               priv,
	//	Pub:                certs.ssh,
	//	TLSCert:            certs.tls,
	//	Expires:            s.clock.Now().UTC().Add(sessionTTL),
	//	BearerToken:        bearerToken,
	//	BearerTokenExpires: s.clock.Now().UTC().Add(bearerTokenTTL),
	//}), nil
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
