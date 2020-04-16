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

package s3sessions

import (
	"context"
	"path/filepath"
	"strings"

	"github.com/gravitational/teleport/lib/events"
	"github.com/gravitational/teleport/lib/session"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
)

// CreateStream creates stream using multipart upload
func (h *Handler) CreateStream(ctx context.Context, sessionID session.ID) (events.Stream, error) {
	input := &s3.CreateMultipartUploadInput{
		Bucket: aws.String(h.Bucket),
		Key:    aws.String(h.protoPath(sessionID)),
	}
	if !h.Config.DisableServerSideEncryption {
		input.ServerSideEncryption = aws.String(s3.ServerSideEncryptionAwsKms)
	}

	// Create the multipart
	resp, err := h.client.CreateMultipartUploadWithContext(ctx, input)
	if err != nil {
		return nil, ConvertS3Error(err)
	}
	return &stream{
		handler:  h,
		uploadID: *resp.UploadId,
	}, nil
}

func (h *Handler) protoPath(sessionID session.ID) string {
	if h.Path == "" {
		return string(sessionID) + ".pb"
	}
	return strings.TrimPrefix(filepath.Join(h.Path, string(sessionID)+".pb"), "/")
}

// StreamWriter uses stream
type stream struct {
	slice        []byte
	bytesWritten int64
	handler      *Handler
	uploadID     string
	upload       func()
}

// Close should complete the uplaod
func (s *stream) Close() error {
	s.handler.slicePool.Put(s.slice)
	return nil
}

// Emit emtits a single audit event
func (s *stream) EmitAuditEvent(ctx context.Context, event events.AuditEvent) error {
	size := event.Size()
	if size > len(s.slice)+bytesWritten {
		s.uploadPart()
	}
	event.MarshalTo()
}

func (s *stream) uploadPart() error {

}
