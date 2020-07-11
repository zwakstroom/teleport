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

type Nonce interface {
	// Resource provides common resource headers.
	Resource

	// String returns string representation of the application.
	String() string

	// CheckAndSetDefaults checks and set default values for any missing fields.
	CheckAndSetDefaults() error
}

func NewNonce() (*NonceV3, error) {
	nonce, err := utils.CryptoRandomHex(16)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &NonceV3{
		Kind:    KindNonce,
		Version: V3,
		Metadata: Metadata{
			Name:      nonce,
			Namespace: defaults.Namespace,
		},
	}, nil
}

// GetKind returns resource kind.
func (s *NonceV3) GetKind() string {
	return s.Kind
}

// GetSubKind gets the resource sub kind.
func (s *NonceV3) GetSubKind() string {
	return s.SubKind
}

// SetSubKind sets the resource sub kind.
func (s *NonceV3) SetSubKind(sk string) {
	s.SubKind = sk
}

// GetVersion gets the resource version.
func (s *NonceV3) GetVersion() string {
	return s.Version
}

// GetName gets the resource (application) name.
func (s *NonceV3) GetName() string {
	return s.Metadata.Name
}

// SetName sets the resource (application) name.
func (s *NonceV3) SetName(e string) {
	s.Metadata.Name = e
}

// Expires gets object expiry setting.
func (s *NonceV3) Expiry() time.Time {
	return s.Metadata.Expiry()
}

// SetExpiry sets object expiry settings.
func (s *NonceV3) SetExpiry(expires time.Time) {
	s.Metadata.SetExpiry(expires)
}

// SetTTL sets Expires header using a real time clock.
func (s *NonceV3) SetTTL(clock clockwork.Clock, ttl time.Duration) {
	s.Metadata.SetTTL(clock, ttl)
}

// GetMetadata gets metadata.
func (s *NonceV3) GetMetadata() Metadata {
	return s.Metadata
}

// GetResourceID gets the resource ID.
func (s *NonceV3) GetResourceID() int64 {
	return s.Metadata.ID
}

// SetResourceID sets the resource ID.
func (s *NonceV3) SetResourceID(id int64) {
	s.Metadata.ID = id
}

// String returns string representation of the application.
func (s *NonceV3) String() string {
	return fmt.Sprintf("Nonce(%v)", s.Metadata.Name)
}

// CheckAndSetDefaults checks and set default values for any missing fields.
func (s *NonceV3) CheckAndSetDefaults() error {
	err := s.Metadata.CheckAndSetDefaults()
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// NonceSpecV3Schema is JSON schema for the application.
const NonceSpecV3Schema = `{
  "type": "object",
  "additionalProperties": false,
  "properties": {}
}`

// GetNonceSchema returns role schema with optionally injected schema for
// extensions.
func GetNonceSchema() string {
	return fmt.Sprintf(V2SchemaTemplate, MetadataSchema, NonceSpecV3Schema, DefaultDefinitions)
}

// UnmarshalNonceResource will return an unmarshalled a role from JSON (or
// YAML), validating the schema and setting any default values.
func UnmarshalNonceResource(data []byte, kind string, cfg *MarshalConfig) (Nonce, error) {
	if len(data) == 0 {
		return nil, trace.BadParameter("missing nonce data")
	}

	var h ResourceHeader
	err := utils.FastUnmarshal(data, &h)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var s NonceV3
	if cfg.SkipValidation {
		if err := utils.FastUnmarshal(data, &s); err != nil {
			return nil, trace.BadParameter(err.Error())
		}
	} else {
		if err := utils.UnmarshalWithSchema(GetNonceSchema(), &s, data); err != nil {
			return nil, trace.BadParameter(err.Error())
		}
	}
	s.Kind = kind
	if err := s.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	if cfg.ID != 0 {
		s.SetResourceID(cfg.ID)
	}
	if !cfg.Expires.IsZero() {
		s.SetExpiry(cfg.Expires)
	}
	return &s, nil
}

var nonceMarshaler NonceMarshaler = &TeleportNonceMarshaler{}

func SetNonceMarshaler(m NonceMarshaler) {
	marshalerMutex.Lock()
	defer marshalerMutex.Unlock()
	nonceMarshaler = m
}

func GetNonceMarshaler() NonceMarshaler {
	marshalerMutex.Lock()
	defer marshalerMutex.Unlock()
	return nonceMarshaler
}

// NonceMarshaler implements marshal and unmarshal for an Nonce.
// mostly adds support for extended versions
type NonceMarshaler interface {
	// UnmarshalNonce will unmarshal a single nonce from binary representation.
	UnmarshalNonce(bytes []byte, kind string, opts ...MarshalOption) (Nonce, error)

	// MarshalNonce will marshal a single nonce to binary representation.
	MarshalNonce(Nonce, ...MarshalOption) ([]byte, error)
}

type TeleportNonceMarshaler struct{}

// UnmarshalNonce will unmarshal a single nonce from binary representation.
func (*TeleportNonceMarshaler) UnmarshalNonce(bytes []byte, kind string, opts ...MarshalOption) (Nonce, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return UnmarshalNonceResource(bytes, kind, cfg)
}

// MarshalNonce will marshal a single nonce to binary representation.
func (*TeleportNonceMarshaler) MarshalNonce(s Nonce, opts ...MarshalOption) ([]byte, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	v3, ok := s.(*NonceV3)
	if !ok {
		return nil, trace.BadParameter("don't know how to marshal %v", V1)
	}
	if !cfg.PreserveResourceID {
		// Avoid modifying the original object to prevent unexpected data races.
		nonceCopy := *v3
		nonceCopy.SetResourceID(0)
		v3 = &nonceCopy
	}
	return utils.FastMarshal(v3)
}
