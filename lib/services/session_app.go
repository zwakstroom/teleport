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
	"encoding/json"
	"fmt"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/jonboulle/clockwork"

	"github.com/gravitational/trace"
)

type AppSession interface {
	// Resource provides common resource headers.
	Resource

	GetID() string
	SetID(string)

	GetUsername() string
	SetUsername(string)

	GetCertificate() []byte
	SetCertificate([]byte)

	// String returns string representation of the application.
	String() string

	// CheckAndSetDefaults checks and set default values for any missing fields.
	CheckAndSetDefaults() error
}

func NewAppSession() (*AppSessionV3, error) {
	sessionID, err := utils.CryptoRandomHex(16)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	// TODO: This should use a clock and not time.Now directly.
	now := time.Now().Add(1 * time.Hour)
	return &AppSessionV3{
		Kind:    KindAppSession,
		Version: V3,
		Metadata: Metadata{
			Name:      sessionID,
			Namespace: defaults.Namespace,
			// TODO: Should this change from 1 hour?
			Expires: &now,
		},
		Spec: AppSessionSpecV3{},
	}, nil
}

// GetKind returns resource kind.
func (s *AppSessionV3) GetKind() string {
	return s.Kind
}

// GetSubKind gets the resource sub kind.
func (s *AppSessionV3) GetSubKind() string {
	return s.SubKind
}

// SetSubKind sets the resource sub kind.
func (s *AppSessionV3) SetSubKind(sk string) {
	s.SubKind = sk
}

// GetVersion gets the resource version.
func (s *AppSessionV3) GetVersion() string {
	return s.Version
}

// GetName gets the resource (application) name.
func (s *AppSessionV3) GetName() string {
	return s.Metadata.Name
}

// SetName sets the resource (application) name.
func (s *AppSessionV3) SetName(e string) {
	s.Metadata.Name = e
}

// Expires gets object expiry setting.
func (s *AppSessionV3) Expiry() time.Time {
	return s.Metadata.Expiry()
}

// SetExpiry sets object expiry settings.
func (s *AppSessionV3) SetExpiry(expires time.Time) {
	s.Metadata.SetExpiry(expires)
}

// SetTTL sets Expires header using a real time clock.
func (s *AppSessionV3) SetTTL(clock clockwork.Clock, ttl time.Duration) {
	s.Metadata.SetTTL(clock, ttl)
}

// GetMetadata gets metadata.
func (s *AppSessionV3) GetMetadata() Metadata {
	return s.Metadata
}

// GetResourceID gets the resource ID.
func (s *AppSessionV3) GetResourceID() int64 {
	return s.Metadata.ID
}

func (s *AppSessionV3) SetResourceID(id int64) {
	s.Metadata.ID = id
}

func (s *AppSessionV3) GetID() string {
	return s.Metadata.Name
}

func (s *AppSessionV3) SetID(id string) {
	s.Metadata.Name = id
}

func (s *AppSessionV3) GetUsername() string {
	return s.Spec.Username
}

func (s *AppSessionV3) SetUsername(username string) {
	s.Spec.Username = username
}

func (s *AppSessionV3) GetCertificate() []byte {
	return s.Spec.Certificate
}

// SetResourceID sets the resource ID.
func (s *AppSessionV3) SetCertificate(certificate []byte) {
	s.Spec.Certificate = certificate
}

// String returns string representation of the application.
func (s *AppSessionV3) String() string {
	return fmt.Sprintf("AppSession(ID=%v)", s.Metadata.Name)
}

// CheckAndSetDefaults checks and set default values for any missing fields.
func (s *AppSessionV3) CheckAndSetDefaults() error {
	err := s.Metadata.CheckAndSetDefaults()
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// AppSessionSpecV3Schema is JSON schema for an app session.
const AppSessionSpecV3Schema = `{
  "type": "object",
  "additionalProperties": false,
  "required": ["certificate"],
  "properties": {
    "certificate": {"type": "string"}%v
  }
}`

var appSessionMarshaler AppSessionMarshaler = &TeleportAppSessionMarshaler{}

// SetAppSessionMarshaler sets global user marshaler
func SetAppSessionMarshaler(u AppSessionMarshaler) {
	marshalerMutex.Lock()
	defer marshalerMutex.Unlock()
	appSessionMarshaler = u
}

// GetAppSessionMarshaler returns currently set user marshaler
func GetAppSessionMarshaler() AppSessionMarshaler {
	marshalerMutex.RLock()
	defer marshalerMutex.RUnlock()
	return appSessionMarshaler
}

// AppSessionMarshaler implements marshal/unmarshal of User implementations
// mostly adds support for extended versions
type AppSessionMarshaler interface {
	// UnmarshalAppSession unmarhsals cert authority from binary representation
	UnmarshalAppSession(bytes []byte) (AppSession, error)
	// MarshalAppSession to binary representation
	MarshalAppSession(c AppSession, opts ...MarshalOption) ([]byte, error)
}

// GetAppSessionSchema returns JSON Schema for app session.
func GetAppSessionSchema() string {
	return GetAppSessionSchemaWithExtensions("")
}

// GetAppSessionSchemaWithExtensions returns JSON Schema for app session with user-supplied extensions.
func GetAppSessionSchemaWithExtensions(extension string) string {
	return fmt.Sprintf(V2SchemaTemplate, MetadataSchema, fmt.Sprintf(AppSessionSpecV3Schema, extension), DefaultDefinitions)
}

type TeleportAppSessionMarshaler struct{}

// UnmarshalAppSession unmarshals app session from on-disk byte format.
func (*TeleportAppSessionMarshaler) UnmarshalAppSession(bytes []byte) (AppSession, error) {
	var h ResourceHeader
	err := json.Unmarshal(bytes, &h)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var s AppSessionV3
	if err := utils.UnmarshalWithSchema(GetAppSessionSchema(), &s, bytes); err != nil {
		return nil, trace.BadParameter(err.Error())
	}

	if err := s.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	return &s, nil
}

// MarshalAppSession marshals app session into on-disk representation.
func (*TeleportAppSessionMarshaler) MarshalAppSession(s AppSession, opts ...MarshalOption) ([]byte, error) {
	return utils.FastMarshal(s)
}
