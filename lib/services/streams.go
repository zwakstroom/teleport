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
	"context"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"
	"github.com/jonboulle/clockwork"
)

// Streams manages audit streams
type Streams interface {
	// CreateStream creates a stream
	CreateStream(ctx context.Context, stream Stream) error

	// CompareAndSwapStream updates stream atomically
	CompareAndSwapStream(ctx context.Context, new, existing Stream) error

	// GetStreams returns a list of streams
	GetStreams(ctx context.Context, opts ...MarshalOption) ([]Stream, error)

	// GetStream returns a stream by id
	GetStream(ctx context.Context, id string, opts ...MarshalOption) (Stream, error)

	// DeleteStream deletes stream by its id
	DeleteStream(ctx context.Context, id string) error
}

// NewStream is a shortcut function that returns a new version
// of stream resource properly initialized
func NewStream(id string) Stream {
	return &StreamV3{
		Kind:    KindStream,
		Version: V3,
		Metadata: Metadata{
			Name:      id,
			Namespace: defaults.Namespace,
		},
	}
}

// Stream represents in progress audit stream associated with session
type Stream interface {
	Resource

	// CheckAndSetDefaults checks validity of all parameters and sets defaults
	CheckAndSetDefaults() error

	// V3 returns V3 version of the resource
	V3() *StreamV3

	// SetUpload provides parameters for the upload
	SetUpload(upload StreamUpload)

	// GetUpload returns upload parameter
	GetUpload() StreamUpload

	// GetParts returns stream parts
	GetParts() []StreamPart

	// SetParts sets stream parts
	SetParts([]StreamPart)

	// GetState returns stream state
	GetState() string

	// SetState sets stream state
	SetState(string)

	// GetMaxReservedPartNumber returns max reserved part numbers
	GetMaxReservedPartNumber() int64

	// SetMaxReservedPartNumber
	SetMaxReservedPartNumber(int64)

	// Clone returns a non-shallow copy of this stream
	Clone() Stream
}

const (
	// StreamStateInit is a default started stream state
	StreamStateInit = ""
	// StreamStateCompleted means that stream was completed by client
	StreamStateCompleted = "completed"
)

// GetMaxReservedPartNumber returns max reserved part numbers
func (s *StreamV3) GetMaxReservedPartNumber() int64 {
	return s.Spec.MaxReservedPartNumber
}

// SetMaxReservedPartNumber sets max reserved part number
func (s *StreamV3) SetMaxReservedPartNumber(num int64) {
	s.Spec.MaxReservedPartNumber = num
}

// GetState returns stream state
func (s *StreamV3) GetState() string {
	return s.Spec.State
}

// SetState sets stream state
func (s *StreamV3) SetState(state string) {
	s.Spec.State = state
}

// CheckAndSetDefaults checks validity of all parameters and sets defaults
func (s *StreamV3) CheckAndSetDefaults() error {
	if err := s.Metadata.CheckAndSetDefaults(); err != nil {
		return trace.Wrap(err)
	}
	if s.Spec.Upload.ID == "" {
		return trace.BadParameter("missing spec.Upload.ID")
	}
	return nil
}

// GetParts returns stream parts
func (s *StreamV3) GetParts() []StreamPart {
	return s.Spec.Parts
}

// SetParts sets stream parts
func (s *StreamV3) SetParts(parts []StreamPart) {
	s.Spec.Parts = parts
}

// Clone returns a non-shallow copy of this stream
func (s *StreamV3) Clone() Stream {
	out := *s
	if s.Spec.Parts != nil && len(s.Spec.Parts) != 0 {
		out.Spec.Parts = make([]StreamPart, len(s.Spec.Parts))
		copy(out.Spec.Parts, s.Spec.Parts)
	}
	return &out
}

// SetUpload provides parameters for the upload
func (s *StreamV3) SetUpload(upload StreamUpload) {
	s.Spec.Upload = upload
}

// GetUpload returns upload parameter
func (s *StreamV3) GetUpload() StreamUpload {
	return s.Spec.Upload
}

// V3 returns V3 version of the resource
func (s *StreamV3) V3() *StreamV3 {
	return s
}

// GetVersion returns resource version
func (s *StreamV3) GetVersion() string {
	return s.Version
}

// GetKind returns resource kind
func (s *StreamV3) GetKind() string {
	return s.Kind
}

// GetSubKind returns resource sub kind
func (s *StreamV3) GetSubKind() string {
	return s.SubKind
}

// SetSubKind sets resource subkind
func (s *StreamV3) SetSubKind(k string) {
	s.SubKind = k
}

// GetResourceID returns resource ID
func (s *StreamV3) GetResourceID() int64 {
	return s.Metadata.ID
}

// SetResourceID sets resource ID
func (s *StreamV3) SetResourceID(id int64) {
	s.Metadata.ID = id
}

// Expiry returns object expiry setting
func (s *StreamV3) Expiry() time.Time {
	return s.Metadata.Expiry()
}

// SetExpiry sets expiry time for the object
func (s *StreamV3) SetExpiry(expires time.Time) {
	s.Metadata.SetExpiry(expires)
}

// GetMetadata returns object metadata
func (s *StreamV3) GetMetadata() Metadata {
	return s.Metadata
}

// SetName sets object name
func (s *StreamV3) SetName(name string) {
	s.Metadata.SetName(name)
}

// GetName returns object name
func (s *StreamV3) GetName() string {
	return s.Metadata.Name
}

// SetTTL sets Expires header using realtime clock
func (s *StreamV3) SetTTL(clock clockwork.Clock, ttl time.Duration) {
	s.Metadata.SetTTL(clock, ttl)
}

// streamV3 is used to check resources compatibility
type streamV3 interface {
	V3() *StreamV3
}

// UnmarshalStream unmarshals stream from JSON
func UnmarshalStream(bytes []byte, opts ...MarshalOption) (Stream, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	var h ResourceHeader
	err = utils.FastUnmarshal(bytes, &h)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	switch h.Version {
	case V3:
		var stream StreamV3
		if err := utils.FastUnmarshal(bytes, &stream); err != nil {
			return nil, trace.BadParameter(err.Error())
		}
		if err := stream.CheckAndSetDefaults(); err != nil {
			return nil, trace.Wrap(err)
		}
		if cfg.ID != 0 {
			stream.SetResourceID(cfg.ID)
		}
		return &stream, nil
	}

	return nil, trace.BadParameter("cert authority resource version %v is not supported", h.Version)
}

// MarshalStream marshalls streams to JSON
func MarshalStream(stream Stream, opts ...MarshalOption) ([]byte, error) {
	cfg, err := collectOptions(opts)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	version := cfg.GetVersion()
	switch version {
	case V2:
		v, ok := stream.(streamV3)
		if !ok {
			return nil, trace.BadParameter("don't know how to marshal %v", V2)
		}
		v3 := v.V3()
		if !cfg.PreserveResourceID {
			// avoid modifying the original object
			// to prevent unexpected data races
			copy := *v3
			copy.SetResourceID(0)
			v3 = &copy
		}
		return utils.FastMarshal(v3)
	default:
		return nil, trace.BadParameter("version %v is not supported", version)
	}
}
