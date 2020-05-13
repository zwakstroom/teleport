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
	"sort"
	"strings"
	"time"

	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"

	"github.com/jonboulle/clockwork"
)

// App represents an application within a Teleport cluster.
type App interface {
	// Resource provides common resource headers.
	Resource

	// GetNamespace gets the application namespace.
	GetNamespace() string
	// SetNamespace sets the application namespace.
	SetNamespace(string)

	// GetHostUUID gets the UUID of the application proxy.
	GetHostUUID() string
	// SetHostUUID sets the UUID of the application proxy.
	SetHostUUID(string)

	// GetProtocol gets the protocol of this application. At the moment
	// only HTTPS is supported.
	GetProtocol() string
	// SetProtocol sets the protocol of this application. At the moment
	// only HTTPS is supported.
	SetProtocol(string)

	// GetURI gets the internal address of the application.
	GetURI() string
	// SetURI sets the internal address of the application.
	SetURI(string)

	// GetPublicAddr gets the address users will access the application at.
	GetPublicAddr() string
	// SetPublicAddr sets the address users will access the application at.
	SetPublicAddr(string)

	// GetRotation gets the state of certificate authority rotation.
	GetRotation() Rotation
	// SetRotation sets the state of certificate authority rotation.
	SetRotation(Rotation)

	// GetStaticLabels returns all of an applications static labels.
	GetStaticLabels() map[string]string
	// GetCommandLabels returns all of an applications dynamic labels.
	GetCommandLabels() map[string]CommandLabel
	// GetAllLabels returns all of an applications static and dynamic labels.
	GetAllLabels() map[string]string

	// TeleportVersion is the Teleport version of the application proxy.
	GetTeleportVersion() string

	// String returns string representation of the application.
	String() string

	// CheckAndSetDefaults checks and set default values for any missing fields.
	CheckAndSetDefaults() error
}

// GetKind returns resource kind.
func (s *AppV3) GetKind() string {
	return s.Kind
}

// GetSubKind gets the resource sub kind.
func (s *AppV3) GetSubKind() string {
	return s.SubKind
}

// SetSubKind sets the resource sub kind.
func (s *AppV3) SetSubKind(sk string) {
	s.SubKind = sk
}

// GetVersion gets the resource version.
func (s *AppV3) GetVersion() string {
	return s.Version
}

// GetName gets the resource (application) name.
func (s *AppV3) GetName() string {
	return s.Metadata.Name
}

// SetName sets the resource (application) name.
func (s *AppV3) SetName(e string) {
	s.Metadata.Name = e
}

// Expires gets object expiry setting.
func (s *AppV3) Expiry() time.Time {
	return s.Metadata.Expiry()
}

// SetExpiry sets object expiry settings.
func (s *AppV3) SetExpiry(expires time.Time) {
	s.Metadata.SetExpiry(expires)
}

// SetTTL sets Expires header using a real time clock.
func (s *AppV3) SetTTL(clock clockwork.Clock, ttl time.Duration) {
	s.Metadata.SetTTL(clock, ttl)
}

// GetMetadata gets metadata.
func (s *AppV3) GetMetadata() Metadata {
	return s.Metadata
}

// GetResourceID gets the resource ID.
func (s *AppV3) GetResourceID() int64 {
	return s.Metadata.ID
}

// SetResourceID sets the resource ID.
func (s *AppV3) SetResourceID(id int64) {
	s.Metadata.ID = id
}

// GetNamespace gets the application namespace.
func (s *AppV3) GetNamespace() string {
	return ProcessNamespace(s.Metadata.Namespace)
}

// SetNamespace sets the application namespace.
func (s *AppV3) SetNamespace(namespace string) {
	s.Metadata.Namespace = namespace
}

// GetHostUUID gets the UUID of the application proxy.
func (s *AppV3) GetHostUUID() string {
	return s.Spec.HostUUID
}

// SetHostUUID sets the application namespace.
func (s *AppV3) SetHostUUID(uuid string) {
	s.Spec.HostUUID = uuid
}

// GetProtocol gets the protocol of this application. At the moment
// only HTTPS is supported.
func (s *AppV3) GetProtocol() string {
	return s.Spec.Protocol
}

// SetProtocol sets the protocol of this application. At the moment
// only HTTPS is supported.
func (s *AppV3) SetProtocol(protocol string) {
	s.Spec.Protocol = protocol
}

// GetURI gets the internal address of the application.
func (s *AppV3) GetURI() string {
	return s.Spec.URI
}

// SetURI sets the internal address of the application.
func (s *AppV3) SetURI(uri string) {
	s.Spec.URI = uri
}

// GetPublicAddr gets the address users will access the application at.
func (s *AppV3) GetPublicAddr() string {
	return s.Spec.PublicAddr
}

// SetPublicAddr sets the address users will access the application at.
func (s *AppV3) SetPublicAddr(publicAddr string) {
	s.Spec.PublicAddr = publicAddr
}

// GetRotation gets the state of certificate authority rotation.
func (s *AppV3) GetRotation() Rotation {
	return s.Spec.Rotation
}

// SetRotation sets the state of certificate authority rotation.
func (s *AppV3) SetRotation(r Rotation) {
	s.Spec.Rotation = r
}

// GetStaticLabels returns all of an applications static labels.
func (s *AppV3) GetStaticLabels() map[string]string {
	return s.Metadata.Labels
}

// GetCommandLabels returns all of an applications dynamic labels.
func (s *AppV3) GetCommandLabels() map[string]CommandLabel {
	if s.Spec.Commands == nil {
		return nil
	}
	out := make(map[string]CommandLabel, len(s.Spec.Commands))
	for key := range s.Spec.Commands {
		val := s.Spec.Commands[key]
		out[key] = &val
	}
	return out
}

// GetAllLabels returns all of an applications static and dynamic labels.
func (s *AppV3) GetAllLabels() map[string]string {
	lmap := make(map[string]string)
	for key, value := range s.Metadata.Labels {
		lmap[key] = value
	}
	for key, cmd := range s.Spec.Commands {
		lmap[key] = cmd.Result
	}
	return lmap
}

// TeleportVersion is the Teleport version of the application proxy.
func (s *AppV3) GetTeleportVersion() string {
	return s.Spec.Version
}

// String returns string representation of the application.
func (s *AppV3) String() string {
	return fmt.Sprintf("App(name=%v, protocol=%v, uri=%v, public=%v, labels=%v)",
		s.Metadata.Name, s.Spec.Protocol, s.Spec.URI, s.Spec.PublicAddr, s.GetAllLabels())
}

// CheckAndSetDefaults checks and set default values for any missing fields.
func (s *AppV3) CheckAndSetDefaults() error {
	err := s.Metadata.CheckAndSetDefaults()
	if err != nil {
		return trace.Wrap(err)
	}

	return nil
}

// AppSpecV3Schema is JSON schema for the application.
const AppSpecV3Schema = `{
  "type": "object",
  "additionalProperties": false,
  "properties": {
	"version": {"type": "string"},
    "protocol": {"type": "string"},
    "uuid": {"type": "string"},
    "uri": {"type": "string"},
    "public_addr": {"type": "string"},
    "labels": {
      "type": "object",
      "additionalProperties": false,
      "patternProperties": {
        "^.*$":  { "type": "string" }
      }
    },
    "commands": {
      "type": "object",
      "additionalProperties": false,
      "patternProperties": {
        "^.*$": {
          "type": "object",
          "additionalProperties": false,
          "required": ["command"],
          "properties": {
            "command": {"type": "array", "items": {"type": "string"}},
            "period": {"type": "string"},
            "result": {"type": "string"}
          }
        }
      }
    },
    "rotation": %v
  }
}`

// GetAppSchema returns role schema with optionally injected schema for
// extensions.
func GetAppSchema() string {
	return fmt.Sprintf(V2SchemaTemplate, MetadataSchema, fmt.Sprintf(AppSpecV3Schema, RotationSchema), DefaultDefinitions)
}

// UnmarshalAppResource will return an unmarshalled a role from JSON (or
// YAML), validating the schema and setting any default values.
func UnmarshalAppResource(data []byte, kind string, cfg *MarshalConfig) (App, error) {
	if len(data) == 0 {
		return nil, trace.BadParameter("missing app data")
	}

	var h ResourceHeader
	err := utils.FastUnmarshal(data, &h)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var s AppV3
	if cfg.SkipValidation {
		if err := utils.FastUnmarshal(data, &s); err != nil {
			return nil, trace.BadParameter(err.Error())
		}
	} else {
		if err := utils.UnmarshalWithSchema(GetAppSchema(), &s, data); err != nil {
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

var appMarshaler AppMarshaler = &TeleportAppMarshaler{}

func SetAppMarshaler(m AppMarshaler) {
	marshalerMutex.Lock()
	defer marshalerMutex.Unlock()
	appMarshaler = m
}

func GetAppMarshaler() AppMarshaler {
	marshalerMutex.Lock()
	defer marshalerMutex.Unlock()
	return appMarshaler
}

// AppMarshaler implements marshal and unmarshal for an App.
// mostly adds support for extended versions
type AppMarshaler interface {
	// UnmarshalApp will unmarshal a single app from binary representation.
	UnmarshalApp(bytes []byte, kind string, opts ...MarshalOption) (App, error)

	// MarshalApp will marshal a single app to binary representation.
	MarshalApp(App, ...MarshalOption) ([]byte, error)

	// UnmarshalApps will unmarshal multiple applications from their binary
	// representation.
	UnmarshalApps(bytes []byte) ([]App, error)

	// MarshalApps will marshal multiple applications to their binary
	// representation.
	MarshalApps([]App) ([]byte, error)
}

type TeleportAppMarshaler struct{}

// UnmarshalApp will unmarshal a single app from binary representation.
func (*TeleportAppMarshaler) UnmarshalApp(bytes []byte, kind string, opts ...MarshalOption) (App, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return UnmarshalAppResource(bytes, kind, cfg)
}

// MarshalApp will marshal a single app to binary representation.
func (*TeleportAppMarshaler) MarshalApp(s App, opts ...MarshalOption) ([]byte, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	v3, ok := s.(*AppV3)
	if !ok {
		return nil, trace.BadParameter("don't know how to marshal %v", V1)
	}
	if !cfg.PreserveResourceID {
		// Avoid modifying the original object to prevent unexpected data races.
		appCopy := *v3
		appCopy.SetResourceID(0)
		v3 = &appCopy
	}
	return utils.FastMarshal(v3)
}

// UnmarshalApps will unmarshal multiple applications from their binary
// representation.
func (*TeleportAppMarshaler) UnmarshalApps(bytes []byte) ([]App, error) {
	var apps []AppV3

	err := utils.FastUnmarshal(bytes, &apps)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	out := make([]App, len(apps))
	for i, v := range apps {
		out[i] = App(&v)
	}
	return out, nil
}

// MarshalApps will marshal multiple applications to their binary
// representation.
func (*TeleportAppMarshaler) MarshalApps(s []App) ([]byte, error) {
	bytes, err := utils.FastMarshal(s)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return bytes, nil
}

// CompareApps returns difference between two applications. Equal (0) if
// identical, OnlyTimestampsDifferent(1) if only timestamps differ, and
// Different(2) otherwise.
func CompareApps(a App, b App) int {
	// Compare metadata like name, namespace, and Teleport version.
	if a.GetName() != b.GetName() {
		return Different
	}
	if a.GetNamespace() != b.GetNamespace() {
		return Different
	}
	if a.GetTeleportVersion() != b.GetTeleportVersion() {
		return Different
	}

	// Compare the application (protocol, internal URL, external URL).
	if a.GetProtocol() != b.GetProtocol() {
		return Different
	}
	if a.GetURI() != b.GetURI() {
		return Different
	}
	if a.GetPublicAddr() != b.GetPublicAddr() {
		return Different
	}

	// Compare rotation.
	r := a.GetRotation()
	if !r.Matches(b.GetRotation()) {
		return Different
	}

	// Compare static and dynamic labels.
	if !utils.StringMapsEqual(a.GetStaticLabels(), b.GetStaticLabels()) {
		return Different
	}
	if !CmdLabelMapsEqual(a.GetCommandLabels(), b.GetCommandLabels()) {
		return Different
	}

	// Compare expiry times.
	if !a.Expiry().Equal(b.Expiry()) {
		return OnlyTimestampsDifferent
	}

	return Equal
}

// FlattenLabels flattens and returns a comma separated string of all labels.
func FlattenLabels(app App) string {
	var labels []string

	// Extract all static and dynamic labels from app.
	for key, val := range app.GetStaticLabels() {
		labels = append(labels, fmt.Sprintf("%s=%s", key, val))
	}
	for key, val := range app.GetCommandLabels() {
		labels = append(labels, fmt.Sprintf("%s=%s", key, val.GetResult()))
	}

	sort.Strings(labels)
	return strings.Join(labels, ",")
}
