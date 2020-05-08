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
	"io"
	"sort"
	"sync"
	"time"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gravitational/teleport/lib/events"
	"github.com/gravitational/teleport/lib/session"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/gravitational/trace"
)

// CreateAuditStream creates stream using multipart upload
func (h *Handler) CreateAuditStream(ctx context.Context, sessionID session.ID) (events.Stream, error) {
	start := time.Now()
	defer func() { h.Infof("Upload created in %v.", time.Since(start)) }()

	input := &s3.CreateMultipartUploadInput{
		Bucket: aws.String(h.Bucket),
		Key:    aws.String(h.path(sessionID)),
	}
	if !h.Config.DisableServerSideEncryption {
		input.ServerSideEncryption = aws.String(s3.ServerSideEncryptionAwsKms)
	}

	// Create the multipart upload
	resp, err := h.client.CreateMultipartUploadWithContext(ctx, input)
	if err != nil {
		return nil, ConvertS3Error(err)
	}

	up := &upload{
		mtx: &sync.Mutex{},
		id:  *resp.UploadId,
		h:   h,
		key: *input.Key,
	}

	return events.NewProtoEmitter(events.ProtoEmitterConfig{Upload: up, Pool: h.slicePool})
}

// ResumeAuditStream resumes stream
func (h *Handler) ResumeAuditStream(ctx context.Context, sessionID session.ID) (events.Stream, error) {
	return nil, trace.BadParameter("not supported")
}

// upload implements events.Upload interface
type upload struct {
	mtx            *sync.Mutex
	key            string
	part           int64
	h              *Handler
	id             string
	completedParts []*s3.CompletedPart
}

// Close cancels all resources allocated and associated with the
// upload without cancelling the upload itself
func (u *upload) Close() error {
	return nil
}

func (u *upload) nextPart() int64 {
	u.mtx.Lock()
	defer u.mtx.Unlock()
	u.part++
	return u.part
}

// sortedParts returns completed uploaded parts sorted in PartNumber order
// required by AWS API
func (u *upload) sortedParts() []*s3.CompletedPart {
	u.mtx.Lock()
	defer u.mtx.Unlock()
	// Parts must be sorted in PartNumber order.
	sort.Slice(u.completedParts, func(i, j int) bool {
		return *u.completedParts[i].PartNumber < *u.completedParts[j].PartNumber
	})
	out := make([]*s3.CompletedPart, len(u.completedParts))
	for i, part := range u.completedParts {
		out[i] = &s3.CompletedPart{
			ETag:       aws.String(*part.ETag),
			PartNumber: aws.Int64(*part.PartNumber),
		}
	}
	return out
}

// Complete completes the upload
func (u *upload) Complete(ctx context.Context) error {
	start := time.Now()
	defer func() { u.h.Infof("UploadPart(%v) completed in %v.", u.id, time.Since(start)) }()

	params := &s3.CompleteMultipartUploadInput{
		Bucket:          aws.String(u.h.Bucket),
		Key:             aws.String(u.key),
		UploadId:        aws.String(u.id),
		MultipartUpload: &s3.CompletedMultipartUpload{Parts: u.sortedParts()},
	}
	_, err := u.h.client.CompleteMultipartUploadWithContext(ctx, params)
	if err != nil {
		return ConvertS3Error(err)
	}
	return nil
}

// UploadPart uploads part
func (u *upload) UploadPart(ctx context.Context, partNumber int, partBody io.ReadSeeker) error {
	start := time.Now()
	defer func() { u.h.Infof("UploadPart(%v) part(%v) uploaded in %v.", u.id, u.part, time.Since(start)) }()

	// This upload exceeded maximum number of supported parts, error now.
	if partNumber > s3manager.MaxUploadParts {
		return trace.LimitExceeded(
			"exceeded total allowed S3 limit MaxUploadParts (%d). Adjust PartSize to fit in this limit", s3manager.MaxUploadParts)
	}

	params := &s3.UploadPartInput{
		Bucket:     aws.String(u.h.Bucket),
		Key:        aws.String(u.key),
		UploadId:   aws.String(u.id),
		Body:       partBody,
		PartNumber: aws.Int64(int64(partNumber)),
	}

	resp, err := u.h.client.UploadPartWithContext(ctx, params)
	if err != nil {
		return ConvertS3Error(err)
	}

	u.completedParts = append(u.completedParts, &s3.CompletedPart{ETag: resp.ETag, PartNumber: aws.Int64(int64(partNumber))})
	return nil
}
