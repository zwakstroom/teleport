package filesessions

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/events"
	"github.com/gravitational/teleport/lib/session"

	"github.com/gravitational/trace"
	"github.com/pborman/uuid"
)

// CreateUpload creates a multipart upload
func (h *Handler) CreateUpload(ctx context.Context, sessionID session.ID) (*events.StreamUpload, error) {
	start := time.Now()
	defer func() { h.Infof("Upload created in %v.", time.Since(start)) }()

	if err := os.MkdirAll(h.uploadsPath(), teleport.PrivateDirMode); err != nil {
		return nil, trace.ConvertSystemError(err)
	}

	upload := events.StreamUpload{
		SessionID: sessionID,
		ID:        uuid.New(),
	}
	if err := upload.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	if err := os.MkdirAll(h.uploadPath(upload), teleport.PrivateDirMode); err != nil {
		return nil, trace.Wrap(err)
	}

	return &upload, nil
}

// UploadPart uploads part
func (h *Handler) UploadPart(ctx context.Context, upload events.StreamUpload, partNumber int64, partBody io.ReadSeeker) (*events.StreamPart, error) {
	start := time.Now()
	defer func() {
		h.Infof("UploadPart(%v) part(%v) uploaded in %v.", upload.ID, partNumber, time.Since(start))
	}()

	if err := checkUpload(upload); err != nil {
		return nil, trace.Wrap(err)
	}

	partPath := h.partPath(upload, partNumber)
	file, err := os.OpenFile(partPath, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		return nil, trace.ConvertSystemError(err)
	}
	defer file.Close()

	if _, err := io.Copy(file, partBody); err != nil {
		if err := os.Remove(partPath); err != nil {
			h.WithError(err).Warningf("Failed to remove file %v.", partPath)
		}
		return nil, trace.Wrap(err)
	}

	return &events.StreamPart{Number: partNumber}, nil
}

// CompleteUpload completes the upload
func (h *Handler) CompleteUpload(ctx context.Context, upload events.StreamUpload, parts []events.StreamPart) error {
	start := time.Now()
	defer func() { h.Infof("UploadPart(%v) completed in %v.", upload.ID, time.Since(start)) }()

	if len(parts) == 0 {
		return trace.BadParameter("need at least one part to complete the upload")
	}
	if err := checkUpload(upload); err != nil {
		return trace.Wrap(err)
	}

	// Parts must be sorted in PartNumber order.
	sort.Slice(parts, func(i, j int) bool {
		return parts[i].Number < parts[j].Number
	})

	uploadPath := h.path(upload.SessionID)

	f, err := os.OpenFile(uploadPath, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		return trace.ConvertSystemError(err)
	}
	defer f.Close()

	files := make([]*os.File, 0, len(parts))
	readers := make([]io.Reader, 0, len(parts))

	defer func() {
		for i := 0; i < len(files); i++ {
			if err := files[i].Close(); err != nil {
				h.WithError(err).Errorf("Failed to remove file %v", files[i].Name())
			}
		}
	}()

	for _, part := range parts {
		partPath := h.partPath(upload, part.Number)
		file, err := os.Open(partPath)
		if err != nil {
			return trace.ConvertSystemError(err)
		}
		files = append(files, file)
		readers = append(readers, file)
	}

	_, err = io.Copy(f, io.MultiReader(readers...))
	if err != nil {
		return trace.Wrap(err)
	}

	err = os.RemoveAll(h.uploadPath(upload))
	if err != nil {
		h.WithError(err).Errorf("Failed to remove upload %v.", upload.ID)
	}

	return nil
}

// ListParts lists upload parts
func (h *Handler) ListParts(ctx context.Context, upload events.StreamUpload) ([]events.StreamPart, error) {
	var parts []events.StreamPart
	if err := checkUpload(upload); err != nil {
		return nil, trace.Wrap(err)
	}
	err := filepath.Walk(h.uploadPath(upload), func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		part, err := partFromFileName(path)
		if err != nil {
			h.WithError(err).Debugf("Skipping file %v.", path)
			return nil
		}
		parts = append(parts, events.StreamPart{
			Number: part,
		})
		return nil
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	// Parts must be sorted in PartNumber order.
	sort.Slice(parts, func(i, j int) bool {
		return parts[i].Number < parts[j].Number
	})
	return parts, nil
}

// ListUploads lists uploads that have been initated but not completed with
// earlier uploads returned first
func (h *Handler) ListUploads(ctx context.Context) ([]events.StreamUpload, error) {
	var uploads []events.StreamUpload
	err := filepath.Walk(h.uploadsPath(), func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			return nil
		}
		uploadID := filepath.Base(path)
		if err := checkUploadID(uploadID); err != nil {
			return trace.Wrap(err)
		}
		uploads = append(uploads, events.StreamUpload{
			ID:        uploadID,
			Initiated: info.Created(),
		})
		return nil
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var prefix *string
	if h.Path != "" {
		trimmed := strings.TrimPrefix(h.Path, "/")
		prefix = &trimmed
	}
	var uploads []events.StreamUpload
	sort.Slice(uploads, func(i, j int) bool {
		return uploads[i].Initiated.Before(uploads[j].Initiated)
	})
	return uploads, nil
}

func (h *Handler) uploadsPath() string {
	return filepath.Join(h.Directory, uploadsDir)
}

func (h *Handler) uploadPath(upload events.StreamUpload) string {
	return filepath.Join(h.uploadsPath(), upload.ID, string(upload.SessionID))
}

func (h *Handler) partPath(upload events.StreamUpload, partNumber int64) string {
	return filepath.Join(h.uploadPath(upload), partFileName(partNumber))
}

func partFileName(partNumber int64) string {
	return fmt.Sprintf("%v.part", partNumber)
}

func partFromFileName(fileName string) (int64, error) {
	base := filepath.Base(fileName)
	if filepath.Ext(base) != partExt {
		return -1, trace.BadParameter("expected extension %v, got %v", partExt, base)
	}
	numberString := strings.TrimSuffix(base, "."+partExt)
	partNumber, err := strconv.ParseInt(numberString, 10, 0)
	if err != nil {
		return -1, trace.Wrap(err)
	}
	return partNumber, nil
}

// checkUpload checks that upload IDs are valid
// and in addition verifies that upload ID is a valid UUID
// to avoid file scanning by passing bogus upload ID file paths
func checkUpload(upload events.StreamUpload) error {
	if err := upload.CheckAndSetDefaults(); err != nil {
		return trace.Wrap(err)
	}
	if err := checkUploadID(upload.ID); err != nil {
		return trace.Wrap(err)
	}
	return nil
}

// checkUploadID checks that upload ID is a valid UUID
// to avoid path scanning or using local paths as upload IDs
func checkUploadID(uploadID string) error {
	out := uuid.Parse(uploadID)
	if out == nil {
		return trace.BadParameter("bad format of upload ID")
	}
	return nil
}

const (
	// uploadsDir is a directory with multipart uploads
	uploadsDir = "multi"
	// partExt is a part extension
	partExt = "part"
)
