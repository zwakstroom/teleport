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
	"crypto/sha256"
	"encoding/hex"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/tlsca"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/gravitational/teleport/lib/wrappers"

	"github.com/gravitational/trace"
)

// CreateWebSession creates a new web session for user without any checks, is
// used by admins.
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

// ExtendWebSession creates a new web session for a user based on a valid
// previous sessionID, method is used to renew the web session for a user.
func (s *AuthServer) ExtendWebSession(user string, prevSessionID string, identity *tlsca.Identity) (services.WebSession, error) {
	prevSession, err := s.GetWebSession(user, prevSessionID)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Consider absolute expiry time that may be set for this session
	// by some external identity service, so we can not renew this session
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

//func (s *AuthServer) UpsertWebSession(user string, sess services.WebSession) error {
//	return s.Identity.UpsertWebSession(user, sess.GetName(), sess)
//}

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

func (s *AuthServer) ExchangeWebSession(ctx context.Context, username string, sessionID string) (services.Nonce, error) {
	session, err := s.Identity.GetWebSession(username, sessionID)
	if err != nil {
		return nil, trace.BadParameter("failed to find existing web session")
	}

	// Calculate the hash of the current session (which will become the parent
	// session). It will be embedded within the nonce.
	sum := sha256.Sum256([]byte(sessionID))
	parentHash := hex.EncodeToString(sum[:])

	nonce, err := s.Identity.CreateNonce(ctx, session.GetUser(), session.GetName())
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return nonce, nil
}

func (s *AuthServer) ExchangeNonce(ctx context.Context, nonceID string) (services.WebSession, error) {
	// Only proceed if a valid nonce is found in the backend. If a valid nonce
	// is found, remove it since it's being exchanged.
	nonce, err := s.Identity.GetNonce(ctx, nonceID)
	if err != nil {
		log.Debugf("Failed to find nonce: %v.", err)
		return nil, trace.BadParameter("invalid nonce")
	}
	err = s.Identity.DeleteNonce(ctx, nonce.GetName())
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// A valid nonce was found, construct a new services.WebSession for the user.
	session, err := s.Identity.GetWebSession(nonce.GetUsername(), nonce.GetSessionID())
	if err != nil {
		return nil, trace.Wrap(err)
	}

	appSessionID, err := utils.CryptoRandomHex(TokenLenBytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	session.SetName(appSessionID)
	// TODO: Need to set the below fields?
	//	Expires:            s.clock.Now().UTC().Add(sessionTTL),
	//	BearerToken:        bearerToken,
	//	BearerTokenExpires: s.clock.Now().UTC().Add(bearerTokenTTL),

	h := sha256.New()
	h.Write([]byte(session.GetName()))
	parentHash := hex.EncodeToString(h.Sum(nil))
	session.SetParentHash(parentHash)

	err = s.Identity.UpsertWebSession(ctx, &services.UpsertWebSessionRequest{
		Type:       services.AppSessionType,
		Username:   session.GetUser(),
		SessionID:  appSessionID,
		ParentHash: parentHash,
		Session:    session,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return session, nil
}

func (s *AuthServer) UpsertWebSession(user string, sess services.WebSession) error {
	return nil
	//return s.Identity.UpsertWebSession(context.TODO(), &services.UpsertWebSessionRequest{
	//	Type:      services.WebSessionType,
	//	Username:  user,
	//	SessionID: sess.GetName(),
	//	Session:   sess,
	//})
}

type WebSessionRequest struct {
	Username   string
	SessionID  string
	ParentHash string
}

func (r *WebSessionRequest) Check() error {
	if r.Username == "" || r.SessionID == "" {
		return trace.BadParameter("invalid web session request")
	}
	return nil
}

func (s *AuthServer) GetNonce(ctx context.Context, nonceID string) (services.Nonce, error) {
	return s.Identity.GetNonce(ctx, nonceID)
}

func (s *AuthServer) CreateNonce(ctx context.Context, username string, sessionID string) (services.Nonce, error) {
	return s.Identity.CreateNonce(ctx, username, sessionID)
}

func (s *AuthServer) DeleteNonce(ctx context.Context, nonce string) error {
	return s.Identity.DeleteNonce(ctx, nonce)
}
