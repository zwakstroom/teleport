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
	"bytes"
	"context"
	"encoding/binary"
	"io"
	"io/ioutil"
	"sync"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"
	log "github.com/sirupsen/logrus"
)

// Upload represents upload operation, for example
// S3 multipart upload
type Upload interface {
	// Complete completes upload
	Complete(ctx context.Context) error
	// UploadPart uploads part
	UploadPart(ctx context.Context, rs io.ReadSeeker) error
	// Close cancels all resources associated with upload
	// without aborting the upload itself
	Close() error
}

// NewProtoEmitter returns emitter that
// writes a protobuf marshaled stream to the multipart uploader
func NewProtoEmitter(ctx context.Context, upload Upload, pool utils.SlicePool) *ProtoEmitter {
	closeCtx, cancel := context.WithCancel(ctx)
	uploadCtx, uploadDone := context.WithCancel(context.Background())
	emitter := &ProtoEmitter{
		upload:     upload,
		pool:       pool,
		eventsCh:   make(chan *OneOf),
		parentCtx:  ctx,
		closeCtx:   closeCtx,
		cancel:     cancel,
		uploadCtx:  uploadCtx,
		uploadDone: uploadDone,
	}
	go emitter.receiveAndUpload()
	return emitter
}

// ProtoEmitter implements a protobuf stream emitter,
// that is not concurrent safe
type ProtoEmitter struct {
	slice    *slice
	upload   Upload
	pool     utils.SlicePool
	eventsCh chan *OneOf

	// parentCtx, when closed will abort all operations
	parentCtx context.Context

	// closeCtx is used to signal closure
	closeCtx context.Context
	cancel   context.CancelFunc

	// uploadCtx is used to signal that all uploads
	// are done
	uploadCtx  context.Context
	uploadDone context.CancelFunc
}

// EmitAuditEvent emits a single audit event to the stream
func (s *ProtoEmitter) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	oneof, err := ToOneOf(event)
	if err != nil {
		return trace.Wrap(err)
	}

	messageSize := oneof.Size()
	if messageSize > MaxProtoMessageSize {
		return trace.BadParameter("record size %v exceeds max message size of %v bytes", messageSize, MaxProtoMessageSize)
	}

	if int64(messageSize) > s.pool.Size()-Int32Size {
		return trace.BadParameter("record size %v exceeds max message size of %v bytes", messageSize, s.pool.Size()-Int32Size)
	}

	start := time.Now()
	select {
	case s.eventsCh <- oneof:
		diff := time.Since(start)
		if diff > 100*time.Millisecond {
			log.Debugf("[SLOW] EmitAuditDevnt took %v.", diff)
		}
		return nil
	case <-s.closeCtx.Done():
		return trace.ConnectionProblem(nil, "emitter is closed")
	case <-ctx.Done():
		return trace.ConnectionProblem(ctx.Err(), "context is closed")
	}
}

// Complete completes the upload waits for completion and returns all allocated resources
func (s *ProtoEmitter) Complete(ctx context.Context) error {
	s.cancel()
	select {
	case <-s.uploadCtx.Done():
		return s.upload.Complete(ctx)
	case <-ctx.Done():
		return trace.ConnectionProblem(ctx.Err(), "context has closed")
	}
}

// Close cancels all resources and attempts to do partial
// upload to preserve the events that otherwise could have been lost
// (imagine a scenario, when client node disconnected and
// completely broke down, whatever events are buffered on the server
// will be attempted to be commited as a part of this close)
func (s *ProtoEmitter) Close() error {
	return s.Complete(s.parentCtx)
}

// receiveAndUpload receives and uploads serialized events
func (s *ProtoEmitter) receiveAndUpload() {
	var current *slice
	var uploads []context.Context

	// this function waits for in flight upload
	// to finish before closing the context signalling closure
	defer func() {
		defer s.uploadDone()
		for _, upload := range uploads {
			select {
			case <-upload.Done():
			case <-s.parentCtx.Done():
				log.Warningf("Service is shutting down, aborted upload.")
				return
			}
		}
	}()

	for {
		select {
		case <-s.closeCtx.Done():
			if current != nil {
				for _, upload := range uploads {
					select {
					case <-upload.Done():
					case <-s.parentCtx.Done():
						log.Warningf("Context aborted upload.")
						return
					}
				}
				uploads = []context.Context{s.startUpload(current)}
				current = nil
			}
			return
		case oneof := <-s.eventsCh:
			// TODO(klizhentas)
			// remove goto obviously:)
		submit:
			if current == nil {
				current = &slice{
					data: s.pool.Get(),
				}
			}
			err := current.emitAuditEvent(oneof)
			if err == nil {
				continue
			}
			if !trace.IsLimitExceeded(err) {
				log.WithError(err).Error("Dropped event due to unexpected error.")
				continue
			}
			// this logic blocks the EmitAuditEvent in case if the
			// upload has not completed and the current slice is out of capacity
			if len(uploads) != 0 {
				start := time.Now().UTC()
				for _, upload := range uploads {
					select {
					case <-upload.Done():
					case <-s.parentCtx.Done():
						log.Warningf("Context aborted upload.")
						return
					}
				}
				log.Debugf("Waited upload for %v.", time.Since(start))
			}
			uploads = []context.Context{s.startUpload(current)}
			current = nil
			goto submit
		}
	}
}

func (s *ProtoEmitter) startUpload(slice *slice) context.Context {
	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		defer s.pool.Put(slice.data)
		defer cancel()

		var retry utils.Retry
		for {
			err := s.upload.UploadPart(ctx, slice.reader())
			if err == nil {
				return
			}
			log.WithError(err).Debugf("Part upload failed.")
			// retry is created opportunistically on first upload error
			if retry == nil {
				var rerr error
				retry, rerr = utils.NewLinear(utils.LinearConfig{
					Step: defaults.NetworkRetryDuration,
					Max:  defaults.NetworkBackoffDuration,
				})
				if rerr != nil {
					// this should never happen, but if it happens, let it crash
					panic(rerr)
				}
			}
			select {
			case <-retry.After():
				log.Debugf("Upload re-attempt after backoff.")
			case <-ctx.Done():
				log.Debugf("Upload aborted due to context closure.")
			}
		}
	}()
	return ctx
}

const (
	// Int32Size is a constant for 32 bit integer byte size
	Int32Size = 4

	// MaxProtoMessageSize is maximum protobuf marshaled message size
	MaxProtoMessageSize = 64 * 1024
)

// slice contains serialized protobuf messages
type slice struct {
	start        time.Time
	bytesWritten int64
	data         []byte
}

// reader returns a reader for the bytes writen
func (s *slice) reader() io.ReadSeeker {
	return bytes.NewReader(s.data[:s.bytesWritten])
}

// emitAuditEvent emits a single audit event to the stream
func (s *slice) emitAuditEvent(oneof *OneOf) error {
	messageSize := oneof.Size()

	recordSize := int64(messageSize + Int32Size)

	// if after the upload the record size still exceeds allocated slice size
	// it means the message is too big for the buffer
	if recordSize > int64(len(s.data)) {
		return trace.BadParameter("message %v exceeds allocated buffer size %v", messageSize, len(s.data))
	}

	if recordSize > int64(len(s.data))-s.bytesWritten {
		return trace.LimitExceeded("the record size exceeds the allocated slice size")
	}

	if s.bytesWritten == 0 {
		s.start = time.Now().UTC()
	}

	// Push record, starting with record size and then the record itself.
	// Network byte order is used because it's most convenient to read for humans.
	binary.BigEndian.PutUint32(s.data[s.bytesWritten:], uint32(messageSize))
	s.bytesWritten += Int32Size
	_, err := oneof.MarshalTo(s.data[s.bytesWritten : s.bytesWritten+int64(messageSize)])
	if err != nil {
		return trace.Wrap(err)
	}
	s.bytesWritten += int64(messageSize)
	return nil
}

// NewProtoReader returns a new proto reader with slice pool
func NewProtoReader(r io.Reader) *ProtoReader {
	return &ProtoReader{
		reader: r,
	}
}

// AuditReader provides method to read
// audit events one by one
type AuditReader interface {
	// Read reads audit events
	Read() (AuditEvent, error)
}

// ProtoReader reads protobuf encoding from reader
type ProtoReader struct {
	reader       io.Reader
	sizeBytes    [Int32Size]byte
	messageBytes [MaxProtoMessageSize]byte
}

// Reset sets reader to read from the passed reader
func (r *ProtoReader) Reset(reader io.Reader) {
	r.reader = reader
}

// Read returns next event or io.EOF in case of the end of the parts
func (r *ProtoReader) Read() (AuditEvent, error) {
	_, err := io.ReadFull(r.reader, r.sizeBytes[:])
	if err != nil {
		return nil, trace.ConvertSystemError(err)
	}
	messageSize := binary.BigEndian.Uint32(r.sizeBytes[:])
	if messageSize == 0 {
		return nil, io.EOF
	}
	_, err = io.ReadFull(r.reader, r.messageBytes[:messageSize])
	if err != nil {
		return nil, trace.ConvertSystemError(err)
	}
	oneof := OneOf{}
	err = oneof.Unmarshal(r.messageBytes[:messageSize])
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return FromOneOf(oneof)
}

// ReadAll reads all events until EOF
func (r *ProtoReader) ReadAll() ([]AuditEvent, error) {
	var events []AuditEvent
	for {
		event, err := r.Read()
		if err != nil {
			if err == io.EOF {
				return events, nil
			}
			return nil, trace.Wrap(err)
		}
		events = append(events, event)
	}
	return events, nil
}

// NewMemoryUpload returns a new memory upload
func NewMemoryUpload() *MemoryUpload {
	return &MemoryUpload{
		mtx: &sync.RWMutex{},
	}
}

// MemoryUpload uploads all bytes to memory, used in tests
type MemoryUpload struct {
	mtx   *sync.RWMutex
	parts [][]byte
}

// Close does nothing for memory uploader
func (m *MemoryUpload) Close() error {
	return nil
}

// Complete completes upload
func (m *MemoryUpload) Complete(ctx context.Context) error {
	return nil
}

// UploadPart uploads part
func (m *MemoryUpload) UploadPart(ctx context.Context, rs io.ReadSeeker) error {
	data, err := ioutil.ReadAll(rs)
	if err != nil {
		return trace.Wrap(err)
	}
	m.mtx.Lock()
	defer m.mtx.Unlock()
	m.parts = append(m.parts, data)
	return nil
}

// Parts returns upload parts uploaded up to date
func (m *MemoryUpload) Parts() [][]byte {
	m.mtx.RLock()
	defer m.mtx.RUnlock()
	return m.parts
}
