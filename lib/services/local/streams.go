package local

import (
	"context"

	"github.com/gravitational/teleport/lib/backend"
	"github.com/gravitational/teleport/lib/services"

	"github.com/gravitational/trace"
)

// Streams is local implementation of Streams service that
// is using local backend
type Streams struct {
	backend.Backend
}

// NewStreamsService returns new instance of StreamsService
func NewStreamsService(b backend.Backend) *Streams {
	return &Streams{
		Backend: b,
	}
}

// CreateStream creates stream
func (s *Streams) CreateStream(ctx context.Context, stream services.Stream) error {
	if err := stream.CheckAndSetDefaults(); err != nil {
		return trace.Wrap(err)
	}
	value, err := services.MarshalStream(stream)
	if err != nil {
		return trace.Wrap(err)
	}
	item := backend.Item{
		Key:     backend.Key(streamsPrefix, stream.GetName()),
		Value:   value,
		Expires: stream.Expiry(),
	}

	_, err = s.Create(ctx, item)
	if err != nil {
		if trace.IsAlreadyExists(err) {
			return trace.AlreadyExists("stream %q already exists", stream.GetName())
		}
		return trace.Wrap(err)
	}
	return nil
}

// DeleteAllStreams deletes all streams, used in tests
func (s *Streams) DeleteAllStreams(ctx context.Context) error {
	startKey := backend.Key(streamsPrefix)
	return s.DeleteRange(ctx, startKey, backend.RangeEnd(startKey))
}

// CompareAndSwapStream updates the stream value
// if the existing value matches existing parameter, returns nil if succeeds,
// trace.CompareFailed otherwise.
func (s *Streams) CompareAndSwapStream(ctx context.Context, new, existing services.Stream) error {
	if err := new.CheckAndSetDefaults(); err != nil {
		return trace.Wrap(err)
	}
	newValue, err := services.MarshalStream(new)
	if err != nil {
		return trace.Wrap(err)
	}
	newItem := backend.Item{
		Key:     backend.Key(streamsPrefix, new.GetName()),
		Value:   newValue,
		Expires: new.Expiry(),
	}

	existingValue, err := services.MarshalStream(existing)
	if err != nil {
		return trace.Wrap(err)
	}
	existingItem := backend.Item{
		Key:     backend.Key(streamsPrefix, existing.GetName()),
		Value:   existingValue,
		Expires: existing.Expiry(),
	}

	_, err = s.CompareAndSwap(ctx, existingItem, newItem)
	if err != nil {
		return trace.Wrap(err)
	}
	return nil
}

// DeleteStream deletes stream by id
func (s *Streams) DeleteStream(ctx context.Context, id string) error {
	if id == "" {
		return trace.BadParameter("missing stream id")
	}
	err := s.Delete(ctx, backend.Key(streamsPrefix, id))
	if err != nil {
		return trace.Wrap(err)
	}
	return nil
}

// GetStream returns stream by name
func (s *Streams) GetStream(ctx context.Context, id string, opts ...services.MarshalOption) (services.Stream, error) {
	if id == "" {
		return nil, trace.BadParameter("missing parameter stream id")
	}
	item, err := s.Get(ctx, backend.Key(streamsPrefix, id))
	if err != nil {
		return nil, trace.Wrap(err)
	}
	stream, err := services.UnmarshalStream(
		item.Value, services.AddOptions(opts, services.WithResourceID(item.ID), services.WithExpires(item.Expires))...)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	if err := stream.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	return stream, nil
}

// GetStreams returns streams
func (s *Streams) GetStreams(ctx context.Context, opts ...services.MarshalOption) ([]services.Stream, error) {
	// Get all items in the bucket.
	startKey := backend.Key(streamsPrefix)
	result, err := s.GetRange(ctx, startKey, backend.RangeEnd(startKey), backend.NoLimit)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	streams := make([]services.Stream, len(result.Items))
	for i, item := range result.Items {
		stream, err := services.UnmarshalStream(
			item.Value, services.AddOptions(opts,
				services.WithResourceID(item.ID),
				services.WithExpires(item.Expires))...)
		if err != nil {
			return nil, trace.Wrap(err)
		}
		if err := stream.CheckAndSetDefaults(); err != nil {
			return nil, trace.Wrap(err)
		}
		streams[i] = stream
	}

	return streams, nil
}

const (
	streamsPrefix = "streams"
)
