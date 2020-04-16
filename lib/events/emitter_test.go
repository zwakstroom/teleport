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

	"gopkg.in/check.v1"

	"github.com/gravitational/teleport/lib/fixtures"
	"github.com/gravitational/teleport/lib/utils"
)

// TestProtoReadWrite tests simple proto read write loop
func (a *EventsTestSuite) TestProtoReadWrite(c *check.C) {
	// 64KB + 5MB similar to S3 min size in bytes
	const size = 1024*1024*5 + 64*1024
	upload := &MemoryUpload{}
	pool := utils.NewSliceSyncPool(size)
	emitter := NewProtoEmitter(upload, pool)
	ctx := context.TODO()

	events := []AuditEvent{&sessionStart, &sessionPrint, &sessionEnd}
	for _, event := range events {
		err := emitter.EmitAuditEvent(ctx, event)
		c.Assert(err, check.IsNil)
	}
	err := emitter.Close()
	c.Assert(err, check.IsNil)
	c.Assert(len(upload.Parts), check.Equals, 1)

	reader := NewProtoReader(bytes.NewReader(upload.Parts[0]))
	outEvents, err := reader.ReadAll()
	c.Assert(err, check.IsNil)
	fixtures.DeepCompareSlices(c, events, outEvents)
}
