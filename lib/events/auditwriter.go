package events

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/session"

	"github.com/gravitational/trace"
	"github.com/jonboulle/clockwork"

	logrus "github.com/sirupsen/logrus"
)

// NewAuditWriter returns a new instance of session writer
func NewAuditWriter(cfg AuditWriterConfig) (*AuditWriter, error) {
	if err := cfg.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	stream, err := cfg.Streamer.CreateAuditStream(cfg.Context, cfg.SessionID)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	writer := &AuditWriter{
		lock:   &sync.Mutex{},
		cfg:    cfg,
		stream: NewCheckingStream(stream, cfg.Clock),
		log: logrus.WithFields(logrus.Fields{
			trace.Component: cfg.Component,
		}),
	}
	go writer.updateStreamStatus()

	return writer, nil
}

// AuditWriterConfig configures audit writer
type AuditWriterConfig struct {
	// SessionID defines the session to record.
	SessionID session.ID

	// ServerID is a server ID to write
	ServerID string

	// Namespace is the session namespace.
	Namespace string

	// RecordOutput stores info on whether to record session output
	RecordOutput bool

	// Component is a component used for logging
	Component string

	// Streamer is used to create and resume audit streams
	Streamer Streamer

	// Context is a context to cancel the writes
	// or any other operations
	Context context.Context

	// Clock is used to override time in tests
	Clock clockwork.Clock
}

// CheckAndSetDefaults checks and sets defaults
func (cfg *AuditWriterConfig) CheckAndSetDefaults() error {
	if cfg.SessionID.IsZero() {
		return trace.BadParameter("missing parameter SessionID")
	}
	if cfg.Streamer == nil {
		return trace.BadParameter("missing parameter Streamer")
	}
	if cfg.Context == nil {
		return trace.BadParameter("missing parameter Context")
	}
	if cfg.Namespace == "" {
		cfg.Namespace = defaults.Namespace
	}

	return nil
}

// AuditWriter wraps session stream
// and writes audit events to it
type AuditWriter struct {
	lock           *sync.Mutex
	isClosed       bool
	cfg            AuditWriterConfig
	log            *logrus.Entry
	lastPrintEvent *SessionPrint
	eventIndex     int64
	buffer         []AuditEvent
	lastStatus     *StreamStatus
	stream         Stream
}

// Status returns channel receiving updates about stream status
// last event index that was uploaded and upload ID
func (a *AuditWriter) Status() <-chan StreamStatus {
	return a.stream.Status()
}

// Done returns channel closed when streamer is closed
// should be used to detect sending errors
func (a *AuditWriter) Done() <-chan struct{} {
	return a.stream.Done()
}

func (a *AuditWriter) updateStatus(status StreamStatus) {
	a.lock.Lock()
	defer a.lock.Unlock()
	a.lastStatus = &status
	lastIndex := -1
	for i := 0; i < len(a.buffer); i++ {
		if status.LastEventIndex < a.buffer[i].GetIndex() {
			break
		}
		lastIndex = i
	}
	if lastIndex > 0 {
		before := len(a.buffer)
		a.buffer = a.buffer[lastIndex+1:]
		fmt.Printf("Dropped %v events buffer size: %v\n", before-len(a.buffer), len(a.buffer))
	}
}

func (a *AuditWriter) updateStreamStatus() {
	for {
		select {
		case status := <-a.stream.Status():
			a.updateStatus(status)
		case <-a.stream.Done():
			wasClosed, lastStatus := a.getStatus()
			if wasClosed {
				a.log.Debugf("Audit WRITER GOT STREAM DONE WITH NO PROBLEM")
				return
			}
			if lastStatus == nil {
				a.log.Debugf("Audit WRITER GOT STREAM DONE WITH PROBLEM BUT HAVE NO STATUS, RETURNING!!!!!")
				if err := a.closeStream(); err != nil {
					a.log.WithError(err).Debugf("Failed to close stream.")
				}
				return
			}
			a.log.Debugf("Audit WRITER GOT STREAM DONE WITH PROBLEM!")
			resumedStream, err := a.cfg.Streamer.ResumeAuditStream(a.cfg.Context, a.cfg.SessionID, lastStatus.UploadID)
			if err != nil {
				a.log.WithError(err).Errorf("Could not resume stream: %v")
				return
			}
			a.log.Debugf("Could resume stream, but closing.")
			resumedStream.Close()
			return
		}
	}
}

// Write takes a chunk and writes it into the audit log
func (a *AuditWriter) Write(data []byte) (int, error) {
	if !a.cfg.RecordOutput {
		return len(data), nil
	}
	// buffer is copied here to prevent data corruption:
	// io.Copy allocates single buffer and calls multiple writes in a loop
	// Write is async, this can lead to cases when the buffer is re-used
	// and data is corrupted unless we copy the data buffer in the first place
	dataCopy := make([]byte, len(data))
	copy(dataCopy, data)

	start := time.Now().UTC().Round(time.Millisecond)
	for len(dataCopy) != 0 {
		printEvent := &SessionPrint{
			Metadata: Metadata{
				Type: SessionPrintEvent,
				Time: start,
			},
			Data: dataCopy,
		}
		if printEvent.Size() > MaxProtoMessageSizeBytes {
			extraBytes := printEvent.Size() - MaxProtoMessageSizeBytes
			printEvent.Data = dataCopy[:extraBytes]
			printEvent.Bytes = int64(len(printEvent.Data))
			dataCopy = dataCopy[extraBytes:]
		} else {
			printEvent.Bytes = int64(len(printEvent.Data))
			dataCopy = nil
		}
		if err := a.EmitAuditEvent(a.cfg.Context, printEvent); err != nil {
			a.log.WithError(err).Error("Failed to emit session print event.")
			return 0, trace.Wrap(err)
		}
	}

	return len(data), nil
}

// EmitAuditEvent emits audit event
func (a *AuditWriter) EmitAuditEvent(ctx context.Context, event AuditEvent) error {
	err := a.setupEvent(event)
	if err != nil {
		return trace.Wrap(err)
	}
	return a.stream.EmitAuditEvent(ctx, event)
}

// Close closes the stream and completes it,
// note that this behavior is different from Stream.Close,
// that aborts it, because of the way the writer is usually used
// the interface - io.WriteCloser has only close method
func (a *AuditWriter) Close() error {
	return a.Complete(a.cfg.Context)
}

func (a *AuditWriter) closeStream() error {
	a.lock.Lock()
	defer a.lock.Unlock()
	a.isClosed = true
	return a.stream.Close()
}

func (a *AuditWriter) getStatus() (bool, *StreamStatus) {
	a.lock.Lock()
	defer a.lock.Unlock()
	return a.isClosed, a.lastStatus
}

// Complete closes the stream and marks it finalized,
// releases associated resources, in case of failure,
// closes this stream on the client side
func (a *AuditWriter) Complete(ctx context.Context) error {
	a.lock.Lock()
	if a.isClosed {
		a.lock.Unlock()
		return nil
	}
	a.isClosed = true
	a.lock.Unlock()
	return a.stream.Complete(a.cfg.Context)
}

func (a *AuditWriter) setupEvent(event AuditEvent) error {
	sess, ok := event.(SessionMetadataSetter)
	if ok {
		sess.SetSessionID(string(a.cfg.SessionID))
	}

	srv, ok := event.(ServerMetadataSetter)
	if ok {
		srv.SetServerNamespace(a.cfg.Namespace)
		srv.SetServerID(a.cfg.ServerID)
	}

	a.lock.Lock()
	defer a.lock.Unlock()

	if a.isClosed {
		return trace.BadParameter("write on closed writer")
	}

	event.SetIndex(a.eventIndex)
	a.eventIndex++

	a.buffer = append(a.buffer, event)

	printEvent, ok := event.(*SessionPrint)
	if !ok {
		return nil
	}

	if a.lastPrintEvent != nil {
		printEvent.Offset = a.lastPrintEvent.Offset + int64(len(a.lastPrintEvent.Data))
		printEvent.DelayMilliseconds = diff(a.lastPrintEvent.Time, printEvent.Time) + a.lastPrintEvent.DelayMilliseconds
		printEvent.ChunkIndex = a.lastPrintEvent.ChunkIndex + 1
	}
	a.lastPrintEvent = printEvent
	return nil
}
