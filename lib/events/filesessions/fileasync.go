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

package filesessions

import (
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/events"
	"github.com/gravitational/teleport/lib/session"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"
	"github.com/jonboulle/clockwork"
	log "github.com/sirupsen/logrus"
)

// UploaderConfig sets up configuration for uploader service
type UploaderConfig struct {
	// ScanDir is data directory with the uploads
	ScanDir string
	// Clock is the clock replacement
	Clock clockwork.Clock
	// Context is an optional context
	Context context.Context
	// ScanPeriod is a uploader dir scan period
	ScanPeriod time.Duration
	// ConcurrentUploads sets up how many parallel uploads to schedule
	ConcurrentUploads int
	// Streamer is upstream streamer to upload events to
	Streamer events.Streamer
	// EventsC is an event channel used to signal events
	// used in tests
	EventsC chan *events.UploadEvent
	// Component is used for logging purposes
	Component string
}

// CheckAndSetDefaults checks and sets default values of UploaderConfig
func (cfg *UploaderConfig) CheckAndSetDefaults() error {
	if cfg.Streamer == nil {
		return trace.BadParameter("missing parameter Streamer")
	}
	if cfg.ScanDir == "" {
		return trace.BadParameter("missing parameter ScanDir")
	}
	if cfg.ConcurrentUploads <= 0 {
		cfg.ConcurrentUploads = defaults.UploaderConcurrentUploads
	}
	if cfg.ScanPeriod <= 0 {
		cfg.ScanPeriod = defaults.UploaderScanPeriod
	}
	if cfg.Context == nil {
		cfg.Context = context.TODO()
	}
	if cfg.Clock == nil {
		cfg.Clock = clockwork.NewRealClock()
	}
	if cfg.Component == "" {
		cfg.Component = teleport.ComponentUpload
	}
	return nil
}

// NewUploader creates new disk based session logger
func NewUploader(cfg UploaderConfig) (*Uploader, error) {
	if err := cfg.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}
	// completer scans for uploads that have been initiated, but not completed
	// by the client (aborted or crashed) and completed them
	handler, err := NewHandler(Config{
		Directory: cfg.ScanDir,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	uploadCompleter, err := events.NewUploadCompleter(events.UploadCompleterConfig{
		Uploader:  handler,
		Unstarted: true,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	ctx, cancel := context.WithCancel(cfg.Context)
	uploader := &Uploader{
		uploadCompleter: uploadCompleter,
		cfg:             cfg,
		log: log.WithFields(log.Fields{
			trace.Component: cfg.Component,
		}),
		cancel:    cancel,
		ctx:       ctx,
		semaphore: make(chan struct{}, cfg.ConcurrentUploads),
	}
	return uploader, nil
}

// Uploader implements a disk based session logger. The imporant
// property of the disk based logger is that it never fails and can be used as
// a fallback implementation behind more sophisticated loggers.
type Uploader struct {
	semaphore chan struct{}

	cfg             UploaderConfig
	log             *log.Entry
	uploadCompleter *events.UploadCompleter

	cancel context.CancelFunc
	ctx    context.Context
}

// Serve runs the uploader until stopped
func (u *Uploader) Serve() error {
	t := time.NewTicker(u.cfg.ScanPeriod)
	defer t.Stop()
	for {
		select {
		case <-u.ctx.Done():
			u.log.Debugf("Uploader is exiting.")
			return nil
		case <-t.C:
			if err := u.uploadCompleter.CheckUploads(u.ctx); err != nil {
				if trace.Unwrap(err) != errContext {
					u.log.WithError(err).Warningf("Uploader scan failed.")
				}
			}
			if err := u.Scan(); err != nil {
				if trace.Unwrap(err) != errContext {
					u.log.WithError(err).Warningf("Uploader scan failed.")
				}
			}
		}
	}
}

// Scan scans the streaming directory and uploads recordings
func (u *Uploader) Scan() error {
	files, err := ioutil.ReadDir(u.cfg.ScanDir)
	if err != nil {
		return trace.ConvertSystemError(err)
	}
	u.log.Debugf("Found %v files in dir %v.", len(files), u.cfg.ScanDir)
	for i := range files {
		fi := files[i]
		if fi.IsDir() {
			continue
		}
		if err := u.startUpload(fi.Name()); err != nil {
			if trace.IsCompareFailed(err) {
				u.log.Debugf("Uploader detected locked file %v, another process is processing it.", fi.Name())
				continue
			}
			return trace.Wrap(err)
		}
	}
	return nil
}

// Close closes all operations
func (u *Uploader) Close() error {
	u.cancel()
	return u.uploadCompleter.Close()
}

type upload struct {
	sessionID session.ID
	reader    *events.ProtoReader
	file      *os.File
}

// releaseFile releases file and associated resources
// in a correct order
func (u *upload) Close() error {
	return trace.NewAggregate(
		u.reader.Close(),
		utils.FSUnlock(u.file),
		u.file.Close(),
	)
}

func (u *upload) removeFiles() error {
	if u.file != nil {
		return trace.ConvertSystemError(os.Remove(u.file.Name()))
	}
	return nil
}

func (u *Uploader) startUpload(fileName string) error {
	sessionID, err := sessionIDFromPath(fileName)
	if err != nil {
		return trace.Wrap(err)
	}
	// Apparently, exclusive lock can be obtained only in RDWR mode on NFS
	sessionFilePath := filepath.Join(u.cfg.ScanDir, fileName)
	sessionFile, err := os.OpenFile(sessionFilePath, os.O_RDWR, 0)
	if err != nil {
		return trace.ConvertSystemError(err)
	}
	if err := utils.FSTryWriteLock(sessionFile); err != nil {
		return trace.NewAggregate(sessionFile.Close(), trace.Wrap(err))
	}
	upload := &upload{
		sessionID: sessionID,
		reader:    events.NewProtoReader(sessionFile),
		file:      sessionFile,
	}
	if err := u.takeSemaphore(); err != nil {
		if err := upload.Close(); err != nil {
			u.log.WithError(err).Warningf("Failed to close upload.")
		}
		return trace.Wrap(err)
	}
	go func() {
		if err := u.upload(upload); err != nil {
			u.log.WithError(err).Warningf("Upload failed.")
		}
	}()
	return nil
}

func (u *Uploader) upload(up *upload) error {
	defer u.releaseSemaphore()
	defer func() {
		if err := up.Close(); err != nil {
			u.log.WithError(err).Warningf("Failed to close upload.")
		}
	}()

	// start with naive upload, add checkpoints and resume later
	stream, err := u.cfg.Streamer.CreateAuditStream(u.ctx, up.sessionID)
	if err != nil {
		return trace.Wrap(err)
	}
	defer func() {
		if err := stream.Close(); err != nil {
			u.log.WithError(err).Debugf("Failed to close stream.")
		}
	}()

	ctx, cancel := context.WithCancel(u.ctx)
	defer cancel()
	go u.monitorStreamStatus(ctx, stream, cancel)

	start := u.cfg.Clock.Now().UTC()
	for {
		event, err := up.reader.Read(ctx)
		if err != nil {
			if err == io.EOF {
				break
			}
			return trace.Wrap(err)
		}
		if err := stream.EmitAuditEvent(u.ctx, event); err != nil {
			return trace.Wrap(err)
		}
	}
	u.log.WithFields(log.Fields{"duration": u.cfg.Clock.Since(start), "session-id": up.sessionID}).Infof("Session upload completed.")
	if err := up.removeFiles(); err != nil {
		u.log.WithError(err).Warningf("Failed to remove session files.")
	}
	return nil
}

// monitorStreamStatus monitors stream's status
// and checkpoints the stream
func (u *Uploader) monitorStreamStatus(ctx context.Context, stream events.Stream, cancel context.CancelFunc) {
	defer cancel()
	for {
		select {
		case <-ctx.Done():
			return
		case <-stream.Done():
			return
		case status := <-stream.Status():
			u.log.Debugf("Got stream status: %v.", status)
		}
	}
}

var errContext = fmt.Errorf("context has closed")

func (u *Uploader) takeSemaphore() error {
	select {
	case u.semaphore <- struct{}{}:
		return nil
	case <-u.ctx.Done():
		return errContext
	}
}

func (u *Uploader) releaseSemaphore() error {
	select {
	case <-u.semaphore:
		return nil
	case <-u.ctx.Done():
		return errContext
	}
}

func (u *Uploader) emitEvent(e events.UploadEvent) {
	if u.cfg.EventsC == nil {
		return
	}
	select {
	case u.cfg.EventsC <- &e:
		return
	default:
		u.log.Warningf("Skip send event on a blocked channel.")
	}
}
