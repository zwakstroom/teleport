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
	"github.com/gravitational/teleport/lib/utils"
	"github.com/gravitational/teleport/lib/wrappers"

	"github.com/gravitational/trace"
)

func (s *AuthServer) UpsertWebSession(user string, sess services.WebSession) error {
	return s.Identity.UpsertWebSession(user, sess.GetName(), sess)
}

func (s *AuthServer) GetWebSession(userName string, id string) (services.WebSession, error) {
	return s.Identity.GetWebSession(userName, id)
}

func (s *AuthServer) GetWebSessionInfo(userName string, id string) (services.WebSession, error) {
	sess, err := s.Identity.GetWebSession(userName, id)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return sess.WithoutSecrets(), nil
}

func (s *AuthServer) DeleteWebSession(user string, id string) error {
	return trace.Wrap(s.Identity.DeleteWebSession(user, id))
}

func (s *AuthServer) NewWebSession(username string, roles []string, traits wrappers.Traits) (services.WebSession, error) {
	user, err := s.GetUser(username, false)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	checker, err := services.FetchRoles(roles, s.Access, traits)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	priv, pub, err := s.GetNewKeyPairFromPool()
	if err != nil {
		return nil, trace.Wrap(err)
	}
	sessionTTL := checker.AdjustSessionTTL(defaults.CertDuration)
	certs, err := s.generateUserCert(certRequest{
		user:      user,
		ttl:       sessionTTL,
		publicKey: pub,
		checker:   checker,
		traits:    traits,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	token, err := utils.CryptoRandomHex(TokenLenBytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	bearerToken, err := utils.CryptoRandomHex(TokenLenBytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	bearerTokenTTL := utils.MinTTL(sessionTTL, BearerTokenTTL)
	return services.NewWebSession(token, services.WebSessionSpecV2{
		User:               user.GetName(),
		Priv:               priv,
		Pub:                certs.ssh,
		TLSCert:            certs.tls,
		Expires:            s.clock.Now().UTC().Add(sessionTTL),
		BearerToken:        bearerToken,
		BearerTokenExpires: s.clock.Now().UTC().Add(bearerTokenTTL),
	}), nil
}

// ExtendWebSession creates a new web session for a user based on a valid
// previous sessionID, method is used to renew the web session for a user
func (s *AuthServer) ExtendWebSession(user string, prevSessionID string, identity *tlsca.Identity) (services.WebSession, error) {
	prevSession, err := s.GetWebSession(user, prevSessionID)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Consider absolute expiry time that may be set for this session
	// by some external identity serivce, so we can not renew this session
	// any more without extra logic for renewal with external OIDC provider.
	expiresAt := prevSession.GetExpiryTime()
	if !expiresAt.IsZero() && expiresAt.Before(s.clock.Now().UTC()) {
		return nil, trace.NotFound("web session has expired")
	}

	roles, traits, err := services.ExtractFromIdentity(s, identity)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	sess, err := s.NewWebSession(user, roles, traits)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	sess.SetExpiryTime(expiresAt)
	bearerTokenTTL := utils.MinTTL(utils.ToTTL(s.clock, expiresAt), BearerTokenTTL)
	sess.SetBearerTokenExpiryTime(s.clock.Now().UTC().Add(bearerTokenTTL))
	if err := s.UpsertWebSession(user, sess); err != nil {
		return nil, trace.Wrap(err)
	}
	sess, err = services.GetWebSessionMarshaler().ExtendWebSession(sess)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return sess, nil
}

// CreateWebSession creates a new web session for user without any checks, is
// used by admins. This may appear to not be used in Teleport, but it's used
// in Gravity, please don't delete.
func (s *AuthServer) CreateWebSession(user string) (services.WebSession, error) {
	u, err := s.GetUser(user, false)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	sess, err := s.NewWebSession(user, u.GetRoles(), u.GetTraits())
	if err != nil {
		return nil, trace.Wrap(err)
	}
	if err := s.UpsertWebSession(user, sess); err != nil {
		return nil, trace.Wrap(err)
	}
	sess, err = services.GetWebSessionMarshaler().GenerateWebSession(sess)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return sess, nil
}

func (s *AuthServer) UpsertAppSession(ctx context.Context, session services.AppSession) {
}
func (s *AuthServer) GetAppSession(ctx context.Context, username string, id string) (services.AppSession, error) {
}
func (s *AuthServer) DeleteAppSession(ctx context.Context, username string, id string) error {
	return s.Identity.DeleteAppSession(ctx, username, id)

}
