package events

import (
	"context"
	"sync"
	"time"

	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/session"

	"github.com/gravitational/trace"

	logrus "github.com/sirupsen/logrus"
)

// NewAuditWriter returns a new instance of session writer
func NewAuditWriter(cfg AuditWriterConfig) (*AuditWriter, error) {
	if err := cfg.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	sr := &AuditWriter{
		lock: &sync.Mutex{},
		cfg:  cfg,
		log: logrus.WithFields(logrus.Fields{
			trace.Component: cfg.Component,
		}),
	}
	return sr, nil
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

	// Stream is a stream to wrap
	Stream Stream

	// Context is a context to cancel the writes
	// or any other operations
	Context context.Context
}

// CheckAndSetDefaults checks and sets defaults
func (cfg *AuditWriterConfig) CheckAndSetDefaults() error {
	if cfg.SessionID.IsZero() {
		return trace.BadParameter("missing parameter SessionID")
	}
	if cfg.Context == nil {
		return trace.BadParameter("missing parameter Context")
	}
	if cfg.Namespace == "" {
		cfg.Namespace = defaults.Namespace
	}
	if cfg.Stream == nil {
		cfg.Stream = &DiscardStream{}
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
}

// Status returns channel receiving updates about stream status
// last event index that was uploaded and upload ID
func (a *AuditWriter) Status() <-chan StreamStatus {
	return nil
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
	return a.cfg.Stream.EmitAuditEvent(ctx, event)
}

// Close closes the stream and completes it,
// note that this behavior is different from Stream.Close,
// that aborts it, because of the way the writer is usually used
// the interface - io.WriteCloser has only close method
func (a *AuditWriter) Close() error {
	return a.Complete(a.cfg.Context)
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
	return a.cfg.Stream.Complete(a.cfg.Context)
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
