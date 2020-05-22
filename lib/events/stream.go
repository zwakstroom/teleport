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
	"errors"
	"io"
	"io/ioutil"
	"sort"
	"sync"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/session"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"
	"github.com/pborman/uuid"
	log "github.com/sirupsen/logrus"
)

const (
	// Int32Size is a constant for 32 bit integer byte size
	Int32Size = 4

	// MaxProtoMessageSizeBytes is maximum protobuf marshaled message size
	MaxProtoMessageSizeBytes = 64 * 1024

	// MaxUploadParts is the maximum allowed number of parts in a multi-part upload
	// on Amazon S3.
	MaxUploadParts = 10000

	// MinUploadPartSizeBytes is the minimum allowed part size when uploading a part to
	// Amazon S3.
	MinUploadPartSizeBytes = 1024 * 1024 * 5

	// ReservedParts is the amount of parts reserved by default
	ReservedParts = 100
)

// ProtoStreamerConfig
type ProtoStreamerConfig struct {
	Uploader MultipartUploader
	// ConcurrentUploads specifies amount of concurrent uploads
	ConcurrentUploads int
	// Pool provides pool of byte slices
	Pool utils.SlicePool
}

// CheckAndSetDefaults
func (cfg *ProtoStreamerConfig) CheckAndSetDefaults() error {
	if cfg.Uploader == nil {
		return trace.BadParameter("missing parameter Uploader")
	}
	if cfg.Pool == nil {
		// the trick of the upload size is to be two messages bigger than minimum upload of AWS (5MB),
		// to make sure that upload always succeeds and every message fits without extra allocation
		cfg.Pool = utils.NewSliceSyncPool(MinUploadPartSizeBytes + 2*MaxProtoMessageSizeBytes)
	}
	if cfg.ConcurrentUploads == 0 {
		cfg.ConcurrentUploads = defaults.ConcurrentUploadsPerStream
	}
	return nil
}

// NewProtoStreamer wraps a streamer and tracks the state of the individual
func NewProtoStreamer(cfg ProtoStreamerConfig) (*ProtoStreamer, error) {
	if err := cfg.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	return &ProtoStreamer{
		cfg: cfg,
	}, nil
}

// ProtoStreamer wraps a streamer and tracks the state of the individual
// stream upload state
type ProtoStreamer struct {
	cfg ProtoStreamerConfig
}

// CreateAuditStream creates audit stream
func (s *ProtoStreamer) CreateAuditStream(ctx context.Context, sid session.ID) (Stream, error) {
	upload, err := s.cfg.Uploader.CreateUpload(ctx, sid)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return NewProtoStream(ProtoStreamConfig{
		Upload:            *upload,
		Pool:              s.cfg.Pool,
		Uploader:          s.cfg.Uploader,
		ConcurrentUploads: s.cfg.ConcurrentUploads,
	})
}

// ResumeAuditStream resumes the stream that
// has not been completed yet
func (s *ProtoStreamer) ResumeAuditStream(ctx context.Context, sid session.ID) (Stream, error) {
	return nil, trace.NotImplemented("not implemented")
}

// ProtoStreamConfig supplies proto emitter configuration
type ProtoStreamConfig struct {
	// Upload is the uplodad this stream is handling
	Upload StreamUpload
	// Uploader handles upload to the storage
	Uploader MultipartUploader
	// Concurrent uploads specifies amount of concurrent uploads
	ConcurrentUploads int
	// Pool is a pool of byte slices
	Pool utils.SlicePool
}

// CheckAndSetDefaults checks and sets default values
func (cfg *ProtoStreamConfig) CheckAndSetDefaults() error {
	if cfg.Upload.ID == "" {
		return trace.BadParameter("missing parameter Upload.ID")
	}
	if cfg.Uploader == nil {
		return trace.BadParameter("missing parameter Uploader")
	}
	if cfg.ConcurrentUploads == 0 {
		return trace.BadParameter("missing parameter ConcurrentUploads")
	}
	if cfg.Pool == nil {
		return trace.BadParameter("misssing parameter Pool")
	}
	return nil
}

// NewProtoStream returns emitter that
// writes a protobuf marshaled stream to the multipart uploader
func NewProtoStream(cfg ProtoStreamConfig) (*ProtoStream, error) {
	if err := cfg.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	cancelCtx, cancel := context.WithCancel(context.Background())
	completeCtx, complete := context.WithCancel(context.Background())
	uploadsCtx, uploadsDone := context.WithCancel(context.Background())
	stream := &ProtoStream{
		cfg:      cfg,
		eventsCh: make(chan *OneOf),

		cancelCtx: cancelCtx,
		cancel:    cancel,

		completeCtx: completeCtx,
		complete:    complete,

		uploadsCtx:  uploadsCtx,
		uploadsDone: uploadsDone,
	}

	writer := &sliceWriter{
		proto:             stream,
		activeUploads:     make(map[int64]*activeUpload),
		completedUploadsC: make(chan *activeUpload),
		semUploads:        make(chan struct{}, cfg.ConcurrentUploads),
		// TODO (klizhentas) when resuming stream this should be set
		lastPartNumber: 0,
	}

	go writer.receiveAndUpload()
	return stream, nil
}

// ProtoStream implements a protobuf stream emitter,
// that is not concurrent safe
type ProtoStream struct {
	cfg ProtoStreamConfig

	slice    *slice
	eventsCh chan *OneOf

	// parentCtx, when closed will abort all operations
	parentCtx context.Context

	// cancelCtx is used to signal closure
	cancelCtx context.Context
	cancel    context.CancelFunc

	// completeCtx is used to signal completion of the operation
	completeCtx context.Context
	complete    context.CancelFunc

	// uploadsCtx is used to signal that all uploads have been completed
	uploadsCtx context.Context
	// uploadsDone is a function signalling that uploads have completed
	uploadsDone context.CancelFunc
}

// EmitAuditEvent emits a single audit event to the stream
func (s *ProtoStream) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	oneof, err := ToOneOf(event)
	if err != nil {
		return trace.Wrap(err)
	}

	messageSize := oneof.Size()
	if messageSize > MaxProtoMessageSizeBytes {
		return trace.BadParameter("record size %v exceeds max message size of %v bytes", messageSize, MaxProtoMessageSizeBytes)
	}

	if int64(messageSize) > s.cfg.Pool.Size()-Int32Size {
		return trace.BadParameter("record size %v exceeds max message size of %v bytes", messageSize, s.cfg.Pool.Size()-Int32Size)
	}

	start := time.Now()
	select {
	case s.eventsCh <- oneof:
		diff := time.Since(start)
		if diff > 100*time.Millisecond {
			log.Debugf("[SLOW] EmitAuditDevnt took %v.", diff)
		}
		return nil
	case <-s.cancelCtx.Done():
		return trace.ConnectionProblem(nil, "emitter is closed")
	case <-s.completeCtx.Done():
		return trace.ConnectionProblem(nil, "emitter is completed")
	case <-ctx.Done():
		return trace.ConnectionProblem(ctx.Err(), "context is closed")
	}
}

// Complete completes the upload waits for completion and returns all allocated resources
func (s *ProtoStream) Complete(ctx context.Context) error {
	s.complete()
	select {
	// wait for all in-flight uploads to complete and stream to be completed
	case <-s.uploadsCtx.Done():
		return nil
	case <-ctx.Done():
		return trace.ConnectionProblem(ctx.Err(), "context has cancelled before complete could succeed")
	}
}

// Close cancels all resources, aborts all operations
// and exits immediatelly
func (s *ProtoStream) Close() error {
	s.cancel()
	return nil
}

// sliceWriter is a helper struct that coordinates
// writing slices and checkpointing
type sliceWriter struct {
	proto *ProtoStream
	// current is the current slice being written to
	current *slice
	// lastPartNumber is the last assigned part number
	lastPartNumber int64
	// activeUploads tracks active uploads
	activeUploads map[int64]*activeUpload
	// completedUploadsC receives uploads that have been completed
	completedUploadsC chan *activeUpload
	// semUploads controls concurrent uploads that are in flight
	semUploads chan struct{}
	// completedParts is the list of completed parts
	completedParts []StreamPart
}

// receiveAndUpload receives and uploads serialized events
func (w *sliceWriter) receiveAndUpload() {
	for {
		select {
		case <-w.proto.cancelCtx.Done():
			// cancel stops all operations without waiting
			return
		case <-w.proto.completeCtx.Done():
			// send remaining data for upload
			if err := w.startUploadCurrentSlice(); err != nil {
				return
			}
			defer w.completeStream()
			return
		case upload := <-w.completedUploadsC:
			part, err := upload.getPart()
			if err != nil {
				log.WithError(err).Error("Could not upload part (assuming retries), aborting.")
				w.proto.Close()
				return
			}
			delete(w.activeUploads, part.Number)
			w.completedParts = append(w.completedParts, *part)
		case oneof := <-w.proto.eventsCh:
			if err := w.submitEvent(oneof); err != nil {
				if !trace.IsLimitExceeded(err) {
					log.WithError(err).Error("Lost event.")
					continue
				}
				// this logic blocks the EmitAuditEvent in case if the
				// upload has not completed and the current slice is out of capacity
				if err := w.startUploadCurrentSlice(); err != nil {
					return
				}
				if err := w.submitEvent(oneof); err != nil {
					log.WithError(err).Error("Lost event.")
					continue
				}
			}
		}
	}
}

// startUploadCurrentSlice starts uploading current slice
// and adds it to the waiting list
func (w *sliceWriter) startUploadCurrentSlice() error {
	if w.current == nil {
		return nil
	}
	w.lastPartNumber++
	activeUpload, err := w.startUpload(w.lastPartNumber, w.current)
	if err != nil {
		return trace.Wrap(err)
	}
	w.activeUploads[w.lastPartNumber] = activeUpload
	w.current = nil
	return nil
}

func (w *sliceWriter) submitEvent(oneof *OneOf) error {
	if w.current == nil {
		w.current = &slice{
			data: w.proto.cfg.Pool.Get(),
		}
	}
	return w.current.emitAuditEvent(oneof)
}

// completeStream  waits for in flight uploads to finish
// and completes the stream
func (w *sliceWriter) completeStream() {
	defer w.proto.uploadsDone()
	for range w.activeUploads {
		select {
		case upload := <-w.completedUploadsC:
			part, err := upload.getPart()
			if err != nil {
				log.WithError(err).Warningf("Failed to upload part.")
				continue
			}
			w.completedParts = append(w.completedParts, *part)
		case <-w.proto.cancelCtx.Done():
			return
		}
	}
	w.proto.cfg.Uploader.CompleteUpload(w.proto.cancelCtx, w.proto.cfg.Upload, w.completedParts)
}

// startUpload acquires upload semaphore and starts upload, returns error
// only if there is a critical error
func (w *sliceWriter) startUpload(partNumber int64, slice *slice) (*activeUpload, error) {
	// acquire semaphore limiting concurrent uploads
	select {
	case w.semUploads <- struct{}{}:
	case <-w.proto.cancelCtx.Done():
		return nil, trace.ConnectionProblem(w.proto.cancelCtx.Err(), "context is closed")
	}

	activeUpload := &activeUpload{
		partNumber: partNumber,
		start:      time.Now().UTC(),
	}

	go func() {
		defer w.proto.cfg.Pool.Put(slice.data)

		defer func() {
			<-w.semUploads
		}()

		defer func() {
			select {
			case w.completedUploadsC <- activeUpload:
			case <-w.proto.cancelCtx.Done():
				return
			}
		}()

		var retry utils.Retry
		for {
			part, err := w.proto.cfg.Uploader.UploadPart(w.proto.cancelCtx, w.proto.cfg.Upload, partNumber, slice.reader())
			if err == nil {
				activeUpload.setPart(*part)
				return
			}
			if errors.Is(trace.Unwrap(err), context.Canceled) {
				activeUpload.setError(err)
				return
			}
			// retry is created on first upload error
			if retry == nil {
				var rerr error
				retry, rerr = utils.NewLinear(utils.LinearConfig{
					Step: defaults.NetworkRetryDuration,
					Max:  defaults.NetworkBackoffDuration,
				})
				if rerr != nil {
					activeUpload.setError(rerr)
					return
				}
			}
			select {
			case <-retry.After():
				log.WithError(err).Debugf("Part upload failed, retrying after backoff.")
			case <-w.proto.cancelCtx.Done():
				return
			}
		}
	}()

	return activeUpload, nil
}

type activeUpload struct {
	mtx        sync.RWMutex
	start      time.Time
	end        time.Time
	partNumber int64
	part       *StreamPart
	err        error
}

func (a *activeUpload) setError(err error) {
	a.mtx.Lock()
	defer a.mtx.Unlock()
	a.end = time.Now().UTC()
	a.err = err
}

func (a *activeUpload) setPart(part StreamPart) {
	a.mtx.Lock()
	defer a.mtx.Unlock()
	a.end = time.Now().UTC()
	a.part = &part
}

func (a *activeUpload) getDiff() time.Duration {
	a.mtx.RLock()
	defer a.mtx.RUnlock()
	return a.end.Sub(a.start)
}

func (a *activeUpload) getPart() (*StreamPart, error) {
	a.mtx.RLock()
	defer a.mtx.RUnlock()
	if a.err != nil {
		return nil, trace.Wrap(a.err)
	}
	if a.part == nil {
		return nil, trace.NotFound("part is not set")
	}
	return a.part, nil
}

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
	messageBytes [MaxProtoMessageSizeBytes]byte
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

// NewMemoryUploader returns a new memory upload implementing multipart
// upload
func NewMemoryUploader() *MemoryUploader {
	return &MemoryUploader{
		mtx:     &sync.RWMutex{},
		uploads: make(map[string]*MemoryUpload),
	}
}

// MemoryUploader uploads all bytes to memory, used in tests
type MemoryUploader struct {
	mtx     *sync.RWMutex
	uploads map[string]*MemoryUpload
}

// MemoryUpload is used in tests
type MemoryUpload struct {
	mtx *sync.RWMutex
	// id is the upload ID
	id string
	// parts is the upload parts
	parts map[int64][]byte
	// sessionID is the session ID associated with the upload
	sessionID session.ID
	//completed specifies upload as completed
	completed bool
}

// CreateUpload creates a multipart upload
func (m *MemoryUploader) CreateUpload(ctx context.Context, sessionID session.ID) (*StreamUpload, error) {
	upload := &StreamUpload{
		ID: uuid.New(),
	}
	m.uploads[upload.ID] = &MemoryUpload{
		id:        upload.ID,
		sessionID: sessionID,
		parts:     make(map[int64][]byte),
	}
	return upload, nil
}

// CompleteUpload completes the upload
func (m *MemoryUploader) CompleteUpload(ctx context.Context, upload StreamUpload, parts []StreamPart) error {
	m.mtx.Lock()
	m.mtx.Unlock()
	up, ok := m.uploads[upload.ID]
	if !ok {
		return trace.NotFound("upload not found")
	}
	if up.completed {
		return trace.BadParameter("upload already completed")
	}
	// verify that all parts have been uploaded
	partsSet := make(map[int64]bool, len(parts))
	for _, part := range parts {
		partsSet[part.Number] = true
		_, ok := up.parts[part.Number]
		if !ok {
			return trace.NotFound("part %v has not been uploaded", part.Number)
		}
	}
	// exclude parts that are not requested to be completed
	for number := range up.parts {
		if !partsSet[number] {
			delete(up.parts, number)
		}
	}
	up.completed = true
	return nil
}

// UploadPart uploads part and returns the part
func (m *MemoryUploader) UploadPart(ctx context.Context, upload StreamUpload, partNumber int64, partBody io.ReadSeeker) (*StreamPart, error) {
	data, err := ioutil.ReadAll(partBody)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	m.mtx.Lock()
	defer m.mtx.Unlock()
	up, ok := m.uploads[upload.ID]
	if !ok {
		return nil, trace.NotFound("upload is not found")
	}
	up.parts[partNumber] = data
	return &StreamPart{Number: partNumber}, nil
}

// GetUploads returns a list of upload IDs
func (m *MemoryUploader) GetUploads() []StreamUpload {
	m.mtx.RLock()
	defer m.mtx.RUnlock()
	out := make([]StreamUpload, 0, len(m.uploads))
	for id := range m.uploads {
		out = append(out, StreamUpload{
			ID: id,
		})
	}
	return out
}

// GetParts returns upload parts uploaded up to date, sorted by part number
func (m *MemoryUploader) GetParts(uploadID string) ([][]byte, error) {
	m.mtx.RLock()
	defer m.mtx.RUnlock()

	up, ok := m.uploads[uploadID]
	if !ok {
		return nil, trace.NotFound("upload is not found")
	}

	partNumbers := make([]int64, 0, len(up.parts))
	sortedParts := make([][]byte, 0, len(up.parts))
	for partNumber := range up.parts {
		partNumbers = append(partNumbers, partNumber)
	}
	sort.Slice(partNumbers, func(i, j int) bool {
		return partNumbers[i] < partNumbers[j]
	})
	for _, partNumber := range partNumbers {
		sortedParts = append(sortedParts, up.parts[partNumber])
	}
	return sortedParts, nil
}
