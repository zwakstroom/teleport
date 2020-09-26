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

package services

import (
	"fmt"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"

	"github.com/jonboulle/clockwork"
)

type AppSession interface {
	Resource

	GetPublicAddr() string
	SetPublicAddr(string)

	GetUsername() string
	SetUsername(string)

	GetRoles() []string
	SetRoles([]string)

	CheckAndSetDefaults() error
}

func NewAppSession(sessionID string, spec AppSessionSpecV3) (AppSession, error) {
	session := &AppSessionV3{
		Kind:    KindAppSession,
		Version: V3,
		Metadata: Metadata{
			Name:      sessionID,
			Namespace: defaults.Namespace,
		},
		Spec: spec,
	}
	if err := session.CheckAndSetDefaults(); err != nil {
		return nil, err
	}
	return session, nil
}

func (r *AppSessionV3) GetKind() string {
	return r.Kind
}

func (r *AppSessionV3) GetSubKind() string {
	return r.SubKind
}

func (r *AppSessionV3) SetSubKind(subKind string) {
	r.SubKind = subKind
}

func (r *AppSessionV3) GetVersion() string {
	return r.Version
}

func (r *AppSessionV3) GetName() string {
	return r.Metadata.Name
}

func (r *AppSessionV3) SetName(name string) {
	r.Metadata.Name = name
}

func (r *AppSessionV3) Expiry() time.Time {
	return r.Metadata.Expiry()
}

func (r *AppSessionV3) SetExpiry(expiry time.Time) {
	r.Metadata.SetExpiry(expiry)
}

func (r *AppSessionV3) SetTTL(clock clockwork.Clock, ttl time.Duration) {
	r.Metadata.SetTTL(clock, ttl)
}

func (r *AppSessionV3) GetMetadata() Metadata {
	return r.Metadata
}

func (r *AppSessionV3) GetResourceID() int64 {
	return r.Metadata.GetID()
}

func (r *AppSessionV3) SetResourceID(id int64) {
	r.Metadata.SetID(id)
}

func (s *AppSessionV3) GetPublicAddr() string {
	return s.Spec.PublicAddr
}

func (s *AppSessionV3) SetPublicAddr(publicAddr string) {
	s.Spec.PublicAddr = publicAddr
}

func (s *AppSessionV3) GetUsername() string {
	return s.Spec.Username
}

func (s *AppSessionV3) SetUsername(username string) {
	s.Spec.Username = username
}

func (s *AppSessionV3) GetRoles() []string {
	return s.Spec.Roles
}

func (s *AppSessionV3) SetRoles(roles []string) {
	s.Spec.Roles = roles
}

func (s *AppSessionV3) String() string {
	return fmt.Sprintf("AppSession(%v)", s.Spec.PublicAddr)
}

func (s *AppSessionV3) CheckAndSetDefaults() error {
	if err := s.Metadata.CheckAndSetDefaults(); err != nil {
		return trace.Wrap(err)
	}

	if s.Spec.PublicAddr == "" {
		return trace.BadParameter("app session is missing public address")
	}
	if s.Spec.Username == "" {
		return trace.BadParameter("app session is missing username")
	}
	if len(s.Spec.Roles) == 0 {
		return trace.BadParameter("app session is missing roles")
	}

	return nil
}

type AppSessionMarshaler interface {
	MarshalAppSession(req AppSession, opts ...MarshalOption) ([]byte, error)
	UnmarshalAppSession(bytes []byte, opts ...MarshalOption) (AppSession, error)
}

type appSessionMarshaler struct{}

func (m *appSessionMarshaler) MarshalAppSession(data AppSession, opts ...MarshalOption) ([]byte, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	switch r := data.(type) {
	case *AppSessionV3:
		if !cfg.PreserveResourceID {
			// Avoid modifying the original object to prevent unexpected data races.
			cp := *r
			cp.SetResourceID(0)
			r = &cp
		}
		return utils.FastMarshal(r)
	default:
		return nil, trace.BadParameter("unrecognized plugin data type: %T", data)
	}
}

func (m *appSessionMarshaler) UnmarshalAppSession(raw []byte, opts ...MarshalOption) (AppSession, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	var data AppSessionV3
	if cfg.SkipValidation {
		if err := utils.FastUnmarshal(raw, &data); err != nil {
			return nil, trace.Wrap(err)
		}
	} else {
		if err := utils.UnmarshalWithSchema(GetAppSessionSchema(), &data, raw); err != nil {
			return nil, trace.Wrap(err)
		}
	}
	if err := data.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	if cfg.ID != 0 {
		data.SetResourceID(cfg.ID)
	}
	if !cfg.Expires.IsZero() {
		data.SetExpiry(cfg.Expires)
	}
	return &data, nil
}

var appSessionMarshalerInstance AppSessionMarshaler = &appSessionMarshaler{}

func GetAppSessionMarshaler() AppSessionMarshaler {
	marshalerMutex.Lock()
	defer marshalerMutex.Unlock()
	return appSessionMarshalerInstance
}

const AppSessionSpecSchema = `{
	"type": "object",
	"additionalProperties": false,
	"properties": {
		"public_addr": { "type":"string" }
		"username": { "type":"string" }
		"roles": { "type":"array" }
	}
}`

func GetAppSessionSchema() string {
	return fmt.Sprintf(V2SchemaTemplate, MetadataSchema, AppSessionSpecSchema, DefaultDefinitions)
}
