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
	"time"

	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gravitational/teleport/lib/events"
	"github.com/gravitational/teleport/lib/session"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/gravitational/trace"
)

// CreateUpload creates a multipart upload
func (h *Handler) CreateUpload(ctx context.Context, sessionID session.ID) (*events.StreamUpload, error) {
	start := time.Now()
	defer func() { h.Infof("Upload created in %v.", time.Since(start)) }()

	input := &s3.CreateMultipartUploadInput{
		Bucket: aws.String(h.Bucket),
		Key:    aws.String(h.path(sessionID)),
	}
	if !h.Config.DisableServerSideEncryption {
		input.ServerSideEncryption = aws.String(s3.ServerSideEncryptionAwsKms)
	}

	resp, err := h.client.CreateMultipartUploadWithContext(ctx, input)
	if err != nil {
		return nil, ConvertS3Error(err)
	}

	return &events.StreamUpload{Key: *resp.Key, ID: *resp.UploadId}, nil
}

// UploadPart uploads part
func (h *Handler) UploadPart(ctx context.Context, upload events.StreamUpload, partNumber int64, partBody io.ReadSeeker) (*events.StreamPart, error) {
	start := time.Now()
	defer func() { h.Infof("UploadPart(%v) part(%v) uploaded in %v.", upload.ID, partNumber, time.Since(start)) }()

	// This upload exceeded maximum number of supported parts, error now.
	if partNumber > s3manager.MaxUploadParts {
		return nil, trace.LimitExceeded(
			"exceeded total allowed S3 limit MaxUploadParts (%d). Adjust PartSize to fit in this limit", s3manager.MaxUploadParts)
	}

	params := &s3.UploadPartInput{
		Bucket:     aws.String(h.Bucket),
		Key:        aws.String(upload.Key),
		UploadId:   aws.String(upload.ID),
		Body:       partBody,
		PartNumber: aws.Int64(partNumber),
	}

	resp, err := h.client.UploadPartWithContext(ctx, params)
	if err != nil {
		return nil, ConvertS3Error(err)
	}

	return &events.StreamPart{ETag: *resp.ETag, Number: partNumber}, nil
}

// CompleteUpload completes the upload
func (h *Handler) CompleteUpload(ctx context.Context, upload events.StreamUpload, parts []events.StreamPart) error {
	start := time.Now()
	defer func() { h.Infof("UploadPart(%v) completed in %v.", upload.ID, time.Since(start)) }()

	// Parts must be sorted in PartNumber order.
	sort.Slice(parts, func(i, j int) bool {
		return parts[i].Number < parts[j].Number
	})

	completedParts := make([]*s3.CompletedPart, len(parts))
	for i := range parts {
		completedParts[i] = &s3.CompletedPart{
			ETag:       aws.String(parts[i].ETag),
			PartNumber: aws.Int64(parts[i].Number),
		}
	}

	params := &s3.CompleteMultipartUploadInput{
		Bucket:          aws.String(h.Bucket),
		Key:             aws.String(upload.Key),
		UploadId:        aws.String(upload.ID),
		MultipartUpload: &s3.CompletedMultipartUpload{Parts: completedParts},
	}
	_, err := h.client.CompleteMultipartUploadWithContext(ctx, params)
	if err != nil {
		return ConvertS3Error(err)
	}
	return nil
}
