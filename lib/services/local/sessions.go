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

package local

import (
	"context"

	"github.com/gravitational/teleport/lib/backend"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/trace"
)

// UpsertWebSession updates or inserts a web session for a user and session ID
// the session will be created with bearer token expiry time TTL, because
// it is expected to be extended by the client before then.
func (s *IdentityService) UpsertWebSession(user, sid string, session services.WebSession) error {
	session.SetUser(user)
	session.SetName(sid)
	value, err := services.GetWebSessionMarshaler().MarshalWebSession(session)
	if err != nil {
		return trace.Wrap(err)
	}
	sessionMetadata := session.GetMetadata()
	item := backend.Item{
		Key:     backend.Key(webPrefix, usersPrefix, user, sessionsPrefix, sid),
		Value:   value,
		Expires: backend.EarliestExpiry(session.GetBearerTokenExpiryTime(), sessionMetadata.Expiry()),
	}
	_, err = s.Put(context.TODO(), item)
	return trace.Wrap(err)
}

// GetWebSession returns a web session state for a given user and session ID.
func (s *IdentityService) GetWebSession(user, sid string) (services.WebSession, error) {
	if user == "" {
		return nil, trace.BadParameter("missing username")
	}
	if sid == "" {
		return nil, trace.BadParameter("missing session id")
	}
	item, err := s.Get(context.TODO(), backend.Key(webPrefix, usersPrefix, user, sessionsPrefix, sid))
	if err != nil {
		return nil, trace.Wrap(err)
	}
	session, err := services.GetWebSessionMarshaler().UnmarshalWebSession(item.Value)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// This is for backwards compatibility to ensure we
	// always have these values.
	session.SetUser(user)
	session.SetName(sid)
	return session, nil
}

// DeleteWebSession deletes web session from the storage.
func (s *IdentityService) DeleteWebSession(user, sid string) error {
	if user == "" {
		return trace.BadParameter("missing username")
	}
	if sid == "" {
		return trace.BadParameter("missing session id")
	}
	err := s.Delete(context.TODO(), backend.Key(webPrefix, usersPrefix, user, sessionsPrefix, sid))
	return trace.Wrap(err)
}

func (s *IdentityService) UpsertAppSession(ctx context.Context, session services.AppSession) error {
	value, err := services.GetAppSessionMarshaler().MarshalAppSession(session)
	if err != nil {
		return trace.Wrap(err)
	}

	item := backend.Item{
		Key:     backend.Key(webPrefix, usersPrefix, session.GetUsername(), appSessionsPrefix, session.GetName()),
		Value:   value,
		Expires: *session.GetMetadata().Expires,
	}
	_, err = s.Put(ctx, item)
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

func (s *IdentityService) GetAppSession(ctx context.Context, username string, id string) (services.AppSession, error) {
	if username == "" {
		return nil, trace.BadParameter("missing username")
	}
	if id == "" {
		return nil, trace.BadParameter("missing session id")
	}

	item, err := s.Get(ctx, backend.Key(webPrefix, usersPrefix, username, appSessionsPrefix, id))
	if err != nil {
		return nil, trace.Wrap(err)
	}
	session, err := services.GetAppSessionMarshaler().UnmarshalAppSession(item.Value)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return session, nil
}

func (s *IdentityService) DeleteAppSession(ctx context.Context, username string, id string) error {
	if username == "" {
		return trace.BadParameter("missing username")
	}
	if id == "" {
		return trace.BadParameter("missing session id")
	}

	err := s.Delete(ctx, backend.Key(webPrefix, usersPrefix, username, appSessionsPrefix, id))
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}
