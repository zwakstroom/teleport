package events

import (
	"bytes"
	"context"
	"encoding/binary"
	"io"
	"io/ioutil"
	"runtime/debug"
	"time"

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
	return &ProtoEmitter{
		upload: upload,
		slice:  pool.Get(),
		pool:   pool,
		ctx:    ctx,
	}
}

// ProtoEmitter implements a protobuf stream emitter,
// that is not concurrent safe
type ProtoEmitter struct {
	sliceStart   time.Time
	bytesWritten int64
	slice        []byte
	upload       Upload
	pool         utils.SlicePool
	ctx          context.Context
}

// Int32Size is a constant for 32 bit integer byte size
const Int32Size = 4

// MaxProtoMessageSize is maximum protobuf marshaled message size
const MaxProtoMessageSize = 64 * 1024

// Close cancels all resources and attempts to do partial
// upload to preserve the events that otherwise could have been lost
// (imagine a scenario, when client node disconnected and
// completely broke down, whatever events are buffered on the server
// will be attempted to be commited as a part of this close)
func (s *ProtoEmitter) Close() error {
	if s.bytesWritten != 0 {
		debug.PrintStack()
		err := s.uploadSlice(s.ctx)
		if err != nil {
			return trace.Wrap(err)
		}
	}
	// do not hold event data in memory with no good reason
	s.pool.Put(s.slice)
	s.slice = nil
	return s.upload.Close()
}

// EmitAuditEvent emtits a single audit event to the stream
func (s *ProtoEmitter) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	// slice is closed
	if s.slice == nil {
		return trace.BadParameter("emitter is closed")
	}

	log.Infof("bytes written: %v\n", s.bytesWritten)
	if s.bytesWritten == 0 {
		s.sliceStart = time.Now().UTC()
	}

	oneof, err := ToOneOf(event)
	if err != nil {
		return trace.Wrap(err)
	}

	messageSize := oneof.Size()
	if messageSize > MaxProtoMessageSize {
		return trace.BadParameter("record size %v exceeds %v bytes", messageSize, MaxProtoMessageSize)
	}

	recordSize := int64(messageSize + Int32Size)

	// if record size exceeds the allocated slice size, upload the part
	// and start over
	if recordSize > int64(len(s.slice))-s.bytesWritten {
		if err := s.uploadSlice(ctx); err != nil {
			return trace.Wrap(err)
		}
	}
	// if after the upload the record size still exceeds allocated sliice size
	// it means the message is too big for the buffer
	if recordSize > int64(len(s.slice)) {
		return trace.BadParameter("message %v exceeds allocated buffer size %v", messageSize, len(s.slice))
	}
	// Push record, starting with record size and then the record itself
	// Network byte order is used because it's most convenient to read for humans
	binary.BigEndian.PutUint32(s.slice[s.bytesWritten:], uint32(messageSize))
	s.bytesWritten += Int32Size
	_, err = oneof.MarshalTo(s.slice[s.bytesWritten : s.bytesWritten+int64(messageSize)])
	if err != nil {
		return trace.Wrap(err)
	}
	s.bytesWritten += int64(messageSize)
	return nil
}

func (s *ProtoEmitter) uploadSlice(ctx context.Context) error {
	log.Debugf("LOOOK!!!! Slice filled to %v bytes in %v.", s.bytesWritten, time.Since(s.sliceStart))
	// set the rest of the slice to zero bytes
	s.pool.Zero(s.slice[s.bytesWritten:])
	if err := s.upload.UploadPart(ctx, bytes.NewReader(s.slice[:s.bytesWritten])); err != nil {
		return trace.Wrap(err)
	}
	s.bytesWritten = 0
	// do not hold event data in memory with no good reason
	s.pool.Zero(s.slice)
	return nil
}

// Complete completes the upload and returns all allocated resources
func (s *ProtoEmitter) Complete(ctx context.Context) error {
	if s.bytesWritten == 0 {
		return nil
	}
	err := s.uploadSlice(ctx)
	if err != nil {
		return trace.Wrap(err)
	}
	// do not hold event data in memory with no good reason
	s.pool.Put(s.slice)
	s.slice = nil
	return s.upload.Complete(ctx)
}

// NewProtoReader returns a new proto reader with slice pool
func NewProtoReader(r io.Reader) *ProtoReader {
	return &ProtoReader{
		reader: r,
	}
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

// MemoryUpload uploads all bytes to memory, used in tests
type MemoryUpload struct {
	Parts [][]byte
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
	m.Parts = append(m.Parts, data)
	return nil
}
