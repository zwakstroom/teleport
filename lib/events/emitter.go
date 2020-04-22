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

package events

import (
	"context"
	"time"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/session"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"
	"github.com/jonboulle/clockwork"
	log "github.com/sirupsen/logrus"
)

// CheckingEmitterConfig provides parameters for emitter
type CheckingEmitterConfig struct {
	// Inner emits events to the underlying store
	Inner Emitter
	// Clock is a clock interface, used in tests
	Clock clockwork.Clock
	// UIDGenerator is unique ID generator
	UIDGenerator utils.UID
}

// NewCheckingEmitter returns emitter that checks
// that all required fields are properly set
func NewCheckingEmitter(cfg CheckingEmitterConfig) (*CheckingEmitter, error) {
	if err := cfg.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	return &CheckingEmitter{
		CheckingEmitterConfig: cfg,
	}, nil
}

// CheckingEmitter ensures that event fields have been set properly
// and reports statistics for every wrapper
type CheckingEmitter struct {
	CheckingEmitterConfig
}

// CheckAndSetDefaults checks and sets default values
func (w *CheckingEmitterConfig) CheckAndSetDefaults() error {
	if w.Inner == nil {
		return trace.BadParameter("missing parameter Inner")
	}
	if w.Clock == nil {
		w.Clock = clockwork.NewRealClock()
	}
	if w.UIDGenerator == nil {
		w.UIDGenerator = utils.NewRealUID()
	}
	return nil
}

// EmitAuditEvent emits audit event
func (r *CheckingEmitter) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	if err := CheckAndSetEventFields(event, r.Clock, r.UIDGenerator); err != nil {
		log.WithError(err).Errorf("Failed to emit audit event.")
		auditFailedEmit.Inc()
		return trace.Wrap(err)
	}
	if err := r.Inner.EmitAuditEvent(ctx, event); err != nil {
		auditFailedEmit.Inc()
		log.WithError(err).Errorf("Failed to emit audit event.")
		return trace.Wrap(err)
	}
	return nil
}

// CheckAndSetEventFields updates passed event fields with additional information
// common for all event types such as unique IDs, timestamps, codes, etc.
//
// This method is a "final stop" for various audit log implementations for
// updating event fields before it gets persisted in the backend.
func CheckAndSetEventFields(event AuditEvent, clock clockwork.Clock, uid utils.UID) error {
	if event.GetCode() == "" {
		return trace.BadParameter("missing mandatory event code field")
	}
	if event.GetType() == "" {
		return trace.BadParameter("missing mandatory event type field")
	}
	if event.GetID() == "" {
		event.SetID(uid.New())
	}
	if event.GetTime().IsZero() {
		event.SetTime(clock.Now().UTC().Round(time.Millisecond))
	}
	return nil
}

// DiscardStream returns a stream that discards all events
type DiscardStream struct {
}

// Close cancels and releases all resources associated
// with the stream without completing the stream,
// can be called multiple times
func (*DiscardStream) Close(ctx context.Context) error {
	return nil
}

// Complete does nothing
func (*DiscardStream) Complete(ctx context.Context) error {
	return nil
}

// EmitAuditEvent discards audit event
func (*DiscardStream) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	log.Debugf("Dicarding stream event: %v", event)
	return nil
}

// NewDiscardEmitter returns a no-op discard emitter
func NewDiscardEmitter() *DiscardEmitter {
	return &DiscardEmitter{}
}

// DiscardEmitter discards all events
type DiscardEmitter struct {
}

// EmitAuditEvent discards audit event
func (*DiscardEmitter) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	log.Debugf("Dicarding event: %v", event)
	return nil
}

// CreateAuditStream creates a stream that discards all events
func (*DiscardEmitter) CreateAuditStream(ctx context.Context, sid session.ID) (Stream, error) {
	return &DiscardStream{}, nil
}

// ResumeAuditStream resumes a stream that discards all events
func (*DiscardEmitter) ResumeAuditStream(ctx context.Context, sid session.ID) (Stream, error) {
	return &DiscardStream{}, nil
}

// NewLoggingEmitter returns an emitter that logs all events to the console
// with the info level
func NewLoggingEmitter() *LoggingEmitter {
	return &LoggingEmitter{}
}

// LoggingEmitter logs all events with info level
type LoggingEmitter struct {
}

// EmitAuditEvent logs audit event
func (*LoggingEmitter) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	data, err := utils.FastMarshal(event)
	if err != nil {
		return trace.Wrap(err)
	}

	var fields log.Fields
	err = utils.FastUnmarshal(data, &fields)
	if err != nil {
		return trace.Wrap(err)
	}
	fields[trace.Component] = teleport.Component(teleport.ComponentAuditLog)

	log.WithFields(fields).Infof(event.GetType())
	return nil
}

// NewMultiEmitter returns emitter that writes
// events to all emitters
func NewMultiEmitter(emitters ...Emitter) *MultiEmitter {
	return &MultiEmitter{
		emitters: emitters,
	}
}

// MultiEmitter writes audit events to multiple emitters
type MultiEmitter struct {
	emitters []Emitter
}

// EmitAuditEvent emits audit event to all emitters
func (m *MultiEmitter) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	var errors []error
	for i := range m.emitters {
		err := m.emitters[i].EmitAuditEvent(ctx, event)
		if err != nil {
			errors = append(errors, err)
		}
	}
	return trace.NewAggregate(errors...)
}

// StreamerAndEmitter combines streamer and emitter to create stream emitter
type StreamerAndEmitter struct {
	Streamer
	Emitter
}

// CheckingStreamerConfig provides parameters for streamer
type CheckingStreamerConfig struct {
	// Inner emits events to the underlying store
	Inner Streamer
	// Clock is a clock interface, used in tests
	Clock clockwork.Clock
	// UIDGenerator is unique ID generator
	UIDGenerator utils.UID
}

// NewCheckingStreamer returns streamer that checks
// that all required fields are properly set
func NewCheckingStreamer(cfg CheckingStreamerConfig) (*CheckingStreamer, error) {
	if err := cfg.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	return &CheckingStreamer{
		CheckingStreamerConfig: cfg,
	}, nil
}

// CheckingStreamer ensures that event fields have been set properly
// and reports statistics for every wrapper
type CheckingStreamer struct {
	CheckingStreamerConfig
}

// CreateAuditStream creates audit event stream
func (s *CheckingStreamer) CreateAuditStream(ctx context.Context, sid session.ID) (Stream, error) {
	stream, err := s.Inner.CreateAuditStream(ctx, sid)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return &CheckingStream{
		cfg:    s.CheckingStreamerConfig,
		stream: stream,
	}, nil
}

// ResumeAuditStream resumes audit event stream
func (s *CheckingStreamer) ResumeAuditStream(ctx context.Context, sid session.ID) (Stream, error) {
	stream, err := s.Inner.ResumeAuditStream(ctx, sid)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return &CheckingStream{
		cfg:    s.CheckingStreamerConfig,
		stream: stream,
	}, nil
}

// CheckAndSetDefaults checks and sets default values
func (w *CheckingStreamerConfig) CheckAndSetDefaults() error {
	if w.Inner == nil {
		return trace.BadParameter("missing parameter Inner")
	}
	if w.Clock == nil {
		w.Clock = clockwork.NewRealClock()
	}
	if w.UIDGenerator == nil {
		w.UIDGenerator = utils.NewRealUID()
	}
	return nil
}

// CheckingStream verifies every event
type CheckingStream struct {
	stream Stream
	cfg    CheckingStreamerConfig
}

// Close cancels and releases all resources associated
// with the stream without completing the stream,
// can be called multiple times
func (s *CheckingStream) Close(ctx context.Context) error {
	return s.stream.Close(ctx)
}

// Complete closes the stream and marks it finalized
func (s *CheckingStream) Complete(ctx context.Context) error {
	return s.stream.Complete(ctx)
}

// EmitAuditEvent emits audit event
func (s *CheckingStream) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	if err := CheckAndSetEventFields(event, s.cfg.Clock, s.cfg.UIDGenerator); err != nil {
		log.WithError(err).Errorf("Failed to emit audit event.")
		auditFailedEmit.Inc()
		return trace.Wrap(err)
	}
	if err := s.stream.EmitAuditEvent(ctx, event); err != nil {
		auditFailedEmit.Inc()
		log.WithError(err).Errorf("Failed to emit audit event.")
		return trace.Wrap(err)
	}
	return nil
}
