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
	"fmt"
	"io"
	"io/ioutil"
	"sort"
	"sync"
	"sync/atomic"
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

	// Int64Size is a constant for 64 bit integer byte size
	Int64Size = 8

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

	// ProtoStreamV1 is a version of the binary protocol
	ProtoStreamV1 = 1

	// ProtoStreamPartV1HeaderSize is the size of the part of the protocol stream
	// on disk format, it consists of
	// * 8 bytes for the format version
	// * 8 bytes for meaningful size of the part
	// * 8 bytes for padding (if present)
	ProtoStreamV1PartHeaderSize = Int64Size * 3

	// ProtoStreamV1RecordHeaderSize is the size of the header
	// of the record header, it consists of the record length
	ProtoStreamV1RecordHeaderSize = Int32Size
)

// ProtoStreamerConfig specifies configuration for the part
type ProtoStreamerConfig struct {
	Uploader MultipartUploader
	// ConcurrentUploads specifies amount of concurrent uploads
	ConcurrentUploads int
	// MinUploadBytes submits upload when they have reached min bytes (could be more,
	// but not less), due to the nature of gzip writer
	MinUploadBytes int64
}

// CheckAndSetDefaults checks and sets streamer defaults
func (cfg *ProtoStreamerConfig) CheckAndSetDefaults() error {
	if cfg.Uploader == nil {
		return trace.BadParameter("missing parameter Uploader")
	}
	if cfg.MinUploadBytes == 0 {
		cfg.MinUploadBytes = MinUploadPartSizeBytes
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
		// Min upload bytes + some overhead to prevent buffer growth (gzip writer is not precise)
		bufferPool: utils.NewBufferSyncPool(cfg.MinUploadBytes + cfg.MinUploadBytes/3),
		// MaxProtoMessage size + length of the message record
		slicePool: utils.NewSliceSyncPool(MaxProtoMessageSizeBytes + ProtoStreamV1RecordHeaderSize),
	}, nil
}

// ProtoStreamer wraps a streamer and tracks the state of the individual
// stream upload state
type ProtoStreamer struct {
	cfg        ProtoStreamerConfig
	bufferPool *utils.BufferSyncPool
	slicePool  *utils.SliceSyncPool
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
		BufferPool:        s.bufferPool,
		SlicePool:         s.slicePool,
		Uploader:          s.cfg.Uploader,
		ConcurrentUploads: s.cfg.ConcurrentUploads,
		MinUploadBytes:    s.cfg.MinUploadBytes,
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
	// BufferPool is a sync pool with buffers
	BufferPool *utils.BufferSyncPool
	// SlicePool is a sync pool with allocated slices
	SlicePool *utils.SliceSyncPool
	// MinUploadBytes submits upload when they have reached min bytes (could be more,
	// but not less), due to the nature of gzip writer
	MinUploadBytes int64
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
	if cfg.BufferPool == nil {
		return trace.BadParameter("missing parameter BufferPool")
	}
	if cfg.SlicePool == nil {
		return trace.BadParameter("missing parameter SlicePool")
	}
	if cfg.MinUploadBytes == 0 {
		return trace.BadParameter("missing parameter MinUploadBytes")
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
	completeCtx  context.Context
	complete     context.CancelFunc
	completeType int32

	// uploadsCtx is used to signal that all uploads have been completed
	uploadsCtx context.Context
	// uploadsDone is a function signalling that uploads have completed
	uploadsDone context.CancelFunc
}

const (
	// completeTypeComplete means that proto stream
	// should complete all in flight uploads and complete the upload itself
	completeTypeComplete = 0
	// completeTypeFlush means that proto stream
	// should complete all in flight uploads but do not complete the upload
	completeTypeFlush = 1
)

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

// Flush compoletes all in flight uploads but does not set the upload as completed
func (s *ProtoStream) Flush(ctx context.Context) error {
	atomic.StoreInt32(&s.completeType, completeTypeFlush)
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
	// emptyHeader is used to write empty header
	// to preserve some bytes
	emptyHeader [ProtoStreamV1PartHeaderSize]byte
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
			if w.current == nil {
				return
			}
			// mark the current part is last (last parts are allowed to be
			// smaller than the certain size, otherwise the padding
			// have to be added (this is due to S3 API limits)
			if atomic.LoadInt32(&w.proto.completeType) == completeTypeComplete {
				w.current.isLast = true
			}
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
				log.WithError(err).Error("Lost event.")
				continue
			}
			if w.shouldUploadCurrentSlice() {
				// this logic blocks the EmitAuditEvent in case if the
				// upload has not completed and the current slice is out of capacity
				if err := w.startUploadCurrentSlice(); err != nil {
					return
				}
			}
		}
	}
}

// shouldUploadCurrentSlice returns true when it's time to upload
// the current slice (it has reached upload bytes)
func (w *sliceWriter) shouldUploadCurrentSlice() bool {
	return w.current.shouldUpload()
}

// startUploadCurrentSlice starts uploading current slice
// and adds it to the waiting list
func (w *sliceWriter) startUploadCurrentSlice() error {
	w.lastPartNumber++
	activeUpload, err := w.startUpload(w.lastPartNumber, w.current)
	if err != nil {
		return trace.Wrap(err)
	}
	w.activeUploads[w.lastPartNumber] = activeUpload
	w.current = nil
	return nil
}

type bufferCloser struct {
	*bytes.Buffer
}

func (b *bufferCloser) Close() error {
	return nil
}

func (w *sliceWriter) newSlice() *slice {
	buffer := w.proto.cfg.BufferPool.Get()
	buffer.Reset()
	// reserve bytes for version header
	buffer.Write(w.emptyHeader[:])
	return &slice{
		proto:  w.proto,
		buffer: buffer,
		writer: newGzipWriter(&bufferCloser{Buffer: buffer}),
	}
}

func (w *sliceWriter) submitEvent(oneof *OneOf) error {
	if w.current == nil {
		w.current = w.newSlice()
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
	if atomic.LoadInt32(&w.proto.completeType) == completeTypeComplete {
		err := w.proto.cfg.Uploader.CompleteUpload(w.proto.cancelCtx, w.proto.cfg.Upload, w.completedParts)
		if err != nil {
			log.WithError(err).Warningf("Failed to complete upload.")
		}
	}
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
		defer func() {
			if err := slice.Close(); err != nil {
				log.WithError(err).Warningf("Failed to close slice.")
			}
		}()

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
			reader, err := slice.reader()
			if err != nil {
				activeUpload.setError(err)
				return
			}
			part, err := w.proto.cfg.Uploader.UploadPart(w.proto.cancelCtx, w.proto.cfg.Upload, partNumber, reader)
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
			if _, err := reader.Seek(0, 0); err != nil {
				activeUpload.setError(err)
				return
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
	proto  *ProtoStream
	start  time.Time
	writer *gzipWriter
	buffer *bytes.Buffer
	isLast bool
}

// reader returns a reader for the bytes writen,
// no writes should be done after this method is called
func (s *slice) reader() (io.ReadSeeker, error) {
	if err := s.writer.Close(); err != nil {
		return nil, trace.Wrap(err)
	}
	wroteBytes := int64(s.buffer.Len())
	var paddingBytes int64
	// non last slices should be at least min upload bytes (as limited by S3 API spec)
	if !s.isLast && wroteBytes < s.proto.cfg.MinUploadBytes {
		paddingBytes = s.proto.cfg.MinUploadBytes - wroteBytes
		emptySlice := s.proto.cfg.SlicePool.Get()
		s.proto.cfg.SlicePool.Zero(emptySlice)
		if _, err := s.buffer.Write(emptySlice[:paddingBytes]); err != nil {
			return nil, trace.Wrap(err)
		}
		s.proto.cfg.SlicePool.Put(emptySlice)
		fmt.Printf("Added %v padding bytes to last small slice of %v\n", paddingBytes, wroteBytes)
	}
	data := s.buffer.Bytes()
	// when the slice was created, the first bytes were reserved
	// for the protocol version number and size of the slice in bytes
	binary.BigEndian.PutUint64(data[0:], ProtoStreamV1)
	binary.BigEndian.PutUint64(data[Int64Size:], uint64(wroteBytes-ProtoStreamV1PartHeaderSize))
	binary.BigEndian.PutUint64(data[Int64Size*2:], uint64(paddingBytes))
	fmt.Printf("Submitted slice with %v bytes, wrote %v bytes and have %v padding\n", len(data), wroteBytes, paddingBytes)
	return bytes.NewReader(data), nil
}

// Close closes buffer and returns all allocated resources
func (s *slice) Close() error {
	err := s.writer.Close()
	s.proto.cfg.BufferPool.Put(s.buffer)
	return trace.Wrap(err)
}

// shouldUpload returns true if it's time to write the slice
// (set to true when it has reached the min slice in bytes)
func (s *slice) shouldUpload() bool {
	fmt.Printf("buffer len: %v and min upload is %v so %v\n", s.buffer.Len(), s.proto.cfg.MinUploadBytes, int64(s.buffer.Len()) >= s.proto.cfg.MinUploadBytes)
	return int64(s.buffer.Len()) >= s.proto.cfg.MinUploadBytes
}

// emitAuditEvent emits a single audit event to the stream
func (s *slice) emitAuditEvent(oneof *OneOf) error {
	bytes := s.proto.cfg.SlicePool.Get()

	messageSize := oneof.Size()
	recordSize := ProtoStreamV1RecordHeaderSize + messageSize

	if len(bytes) < recordSize {
		return trace.BadParameter(
			"error in buffer allocation, expected size to be >= %v, got %v", recordSize, len(bytes))
	}
	binary.BigEndian.PutUint32(bytes, uint32(messageSize))
	_, err := oneof.MarshalTo(bytes[Int32Size:])
	if err != nil {
		return trace.Wrap(err)
	}
	wroteBytes, err := s.writer.Write(bytes[:recordSize])
	if err != nil {
		return trace.Wrap(err)
	}
	if wroteBytes != recordSize {
		return trace.BadParameter("expected %v bytes to be written, got %v", recordSize, wroteBytes)
	}

	s.proto.cfg.SlicePool.Put(bytes)
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

const (
	// protoReaderStateInit is ready to start reading the next part
	protoReaderStateInit = 0
	// protoReaderStateCurrent will read the data from the current part
	protoReaderStateCurrent = iota
	// protoReaderStateEOF indicates that reader has completed reading
	// all parts
	protoReaderStateEOF = iota
	// protoReaderStateError indicates that reader has reached internal
	// error and should close
	protoReaderStateError = iota
)

// ProtoReader reads protobuf encoding from reader
type ProtoReader struct {
	gzipReader   *gzipReader
	padding      int64
	reader       io.Reader
	sizeBytes    [Int64Size]byte
	messageBytes [MaxProtoMessageSizeBytes]byte
	state        int
	error        error
	paddingBytes []byte
}

// Close releases reader resources
func (r *ProtoReader) Close() error {
	if r.gzipReader != nil {
		return r.gzipReader.Close()
	}
	return nil
}

// Reset sets reader to read from the passed reader
func (r *ProtoReader) Reset(reader io.Reader) {
	r.reader = reader
}

func (r *ProtoReader) setError(err error) error {
	r.state = protoReaderStateError
	r.error = err
	return err
}

// Read returns next event or io.EOF in case of the end of the parts
func (r *ProtoReader) Read() (AuditEvent, error) {
	// 2 iterations is an extra precaution to avoid endless loop
	for i := 0; i < 2; i++ {
		switch r.state {
		case protoReaderStateEOF:
			return nil, io.EOF
		case protoReaderStateError:
			return nil, r.error
		case protoReaderStateInit:
			// read the part header that consists of the protocol version
			// and the part size (for the V1 version of the protocol)
			_, err := io.ReadFull(r.reader, r.sizeBytes[:Int64Size])
			if err != nil {
				// reached the end of the stream
				if err == io.EOF {
					r.state = protoReaderStateEOF
					return nil, err
				}
				return nil, r.setError(trace.ConvertSystemError(err))
			}
			protocolVersion := binary.BigEndian.Uint64(r.sizeBytes[:Int64Size])
			fmt.Printf("Proto version: %v\n", protocolVersion)
			if protocolVersion != ProtoStreamV1 {
				return nil, trace.BadParameter("unsupported protocol version %v", protocolVersion)
			}
			// read size of this gzipped part as encoded by V1 protocol version
			_, err = io.ReadFull(r.reader, r.sizeBytes[:Int64Size])
			if err != nil {
				return nil, r.setError(trace.ConvertSystemError(err))
			}
			partSize := binary.BigEndian.Uint64(r.sizeBytes[:Int64Size])
			fmt.Printf("Part size: %v\n", partSize)
			// read padding size (could be 0)
			_, err = io.ReadFull(r.reader, r.sizeBytes[:Int64Size])
			if err != nil {
				return nil, r.setError(trace.ConvertSystemError(err))
			}
			r.padding = int64(binary.BigEndian.Uint64(r.sizeBytes[:Int64Size]))
			fmt.Printf("Padding: %v\n", r.padding)
			gzipReader, err := newGzipReader(ioutil.NopCloser(io.LimitReader(r.reader, int64(partSize))))
			if err != nil {
				return nil, r.setError(trace.Wrap(err))
			}
			r.gzipReader = gzipReader
			r.state = protoReaderStateCurrent
			continue
			// read the next version from the gzip reader
		case protoReaderStateCurrent:
			// the record consists of length of the protobuf encoded
			// message and the message itself
			_, err := io.ReadFull(r.gzipReader, r.sizeBytes[:Int32Size])
			if err != nil {
				// reached the end of the part, but not necessarily
				// the end of the stream
				if err == io.EOF {
					if err := r.gzipReader.Close(); err != nil {
						return nil, r.setError(trace.ConvertSystemError(err))
					}
					if r.padding != 0 {
						fmt.Printf("Skipping padding %v\n", r.padding)
						skipped, err := io.CopyBuffer(ioutil.Discard, io.LimitReader(r.reader, r.padding), r.messageBytes[:])
						if err != nil {
							return nil, r.setError(trace.ConvertSystemError(err))
						}
						if skipped != r.padding {
							return nil, r.setError(trace.BadParameter(
								"data truncated, expected to read %v bytes, but got %v", r.padding, skipped))
						}
					}
					r.padding = 0
					r.gzipReader = nil
					r.state = protoReaderStateInit
					continue
				}
				return nil, r.setError(trace.ConvertSystemError(err))
			}
			messageSize := binary.BigEndian.Uint32(r.sizeBytes[:Int32Size])
			// zero message size indicates end of the part
			// that sometimes is present in partially submitted parts
			// that have to be filled with zeroes for parts smaller
			// than minimum allowed size
			if messageSize == 0 {
				return nil, r.setError(trace.BadParameter("unexpected message size 0"))
			}
			_, err = io.ReadFull(r.gzipReader, r.messageBytes[:messageSize])
			if err != nil {
				return nil, r.setError(trace.ConvertSystemError(err))
			}
			oneof := OneOf{}
			err = oneof.Unmarshal(r.messageBytes[:messageSize])
			fmt.Printf("Message size: %v\n", messageSize)
			if err != nil {
				return nil, trace.Wrap(err)
			}
			return FromOneOf(oneof)
		default:
			return nil, trace.BadParameter("unsupported reader size")
		}
	}
	return nil, r.setError(
		trace.BadParameter("internal algo error: too many interations reading the stream, the stream may be corrupted"))
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
