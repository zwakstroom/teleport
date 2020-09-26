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
	"encoding/json"

	"github.com/gravitational/teleport/lib/backend"
	"github.com/gravitational/teleport/lib/services"

	"github.com/gravitational/trace"
)

func (s *IdentityService) GetAppSession(ctx context.Context, sessionID string) (services.AppSession, error) {
	item, err := s.Get(ctx, backend.Key(sessionsPrefix, appsPrefix, sessionID))
	if err != nil {
		return nil, trace.Wrap(err)
	}

	session, err := services.GetAppSessionMarshaler().UnmarshalAppSession(item.Value)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return session, nil
}

func (s *IdentityService) GetAppSessions(ctx context.Context) ([]services.AppSession, error) {
	startKey := backend.Key(sessionsPrefix, appsPrefix)
	result, err := s.GetRange(context.TODO(), startKey, backend.RangeEnd(startKey), backend.NoLimit)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	out := make([]services.AppSession, len(result.Items))
	for i, item := range result.Items {
		var a services.AppSession
		if err := json.Unmarshal(item.Value, &a); err != nil {
			return nil, trace.Wrap(err)
		}
		out[i] = a
	}
	return out, nil
}

func (s *IdentityService) UpsertAppSession(ctx context.Context, session services.AppSession) error {
	value, err := services.GetAppSessionMarshaler().MarshalAppSession(session)
	if err != nil {
		return trace.Wrap(err)
	}
	item := backend.Item{
		Key:     backend.Key(sessionsPrefix, appsPrefix, session.GetName()),
		Value:   value,
		Expires: session.Expiry(),
	}

	if _, err = s.Put(ctx, item); err != nil {
		return trace.Wrap(err)
	}
	return nil
}

func (s *IdentityService) DeleteAppSession(ctx context.Context, sessionID string) error {
	if err := s.Delete(ctx, backend.Key(sessionsPrefix, appsPrefix, sessionID)); err != nil {
		return trace.Wrap(err)
	}
	return nil
}

func (s *IdentityService) DeleteAllAppSessions(ctx context.Context) error {
	startKey := backend.Key(sessionsPrefix, appsPrefix)
	if err := s.DeleteRange(ctx, startKey, backend.RangeEnd(startKey)); err != nil {
		return trace.Wrap(err)
	}
	return nil
}
