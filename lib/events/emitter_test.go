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

	"github.com/gravitational/trace"
)

// TestProtoEmitter tests edge cases of proto emitter implementation
func (a *EventsTestSuite) TestProtoEmitter(c *check.C) {
	type testCase struct {
		name       string
		bufferSize int64
		events     []AuditEvent
		err        error
	}
	testCases := []testCase{
		{
			name:       "64KB + 5MB similar to S3 min size in bytes",
			bufferSize: 1024*1024*5 + 64*1024,
			events:     []AuditEvent{&sessionStart, &sessionPrint, &sessionEnd},
		},
		{
			name:       "pick largest message as buffer size to get more parts",
			bufferSize: int64(max(MustToOneOf(&sessionStart).Size(), MustToOneOf(&sessionPrint).Size(), MustToOneOf(&sessionEnd).Size()) + Int32Size),
			events:     []AuditEvent{&sessionStart, &sessionPrint, &sessionEnd},
		},
		{
			name:       "no events",
			bufferSize: 1024*1024*5 + 64*1024,
		},
		{
			name:       "one event fitting 100%",
			bufferSize: int64(MustToOneOf(&sessionStart).Size() + Int32Size),
			events:     []AuditEvent{&sessionStart},
		},
		{
			name:       "one event not fitting",
			bufferSize: int64(MustToOneOf(&sessionStart).Size() - 2),
			err:        trace.BadParameter("event is not fitting max size"),
			events:     []AuditEvent{&sessionStart},
		},
	}

	ctx := context.TODO()
testcases:
	for _, tc := range testCases {
		upload := &MemoryUpload{}
		pool := utils.NewSliceSyncPool(tc.bufferSize)
		emitter := NewProtoEmitter(upload, pool)

		for _, event := range tc.events {
			err := emitter.EmitAuditEvent(ctx, event)
			if tc.err != nil {
				c.Assert(err, check.FitsTypeOf, tc.err)
				continue testcases
			} else {
				c.Assert(err, check.IsNil)
			}
		}
		err := emitter.Complete(ctx)
		c.Assert(err, check.IsNil)

		var outEvents []AuditEvent
		for _, part := range upload.Parts {
			reader := NewProtoReader(bytes.NewReader(part))
			out, err := reader.ReadAll()
			c.Assert(err, check.IsNil)
			outEvents = append(outEvents, out...)
		}
		fixtures.DeepCompareSlices(c, tc.events, outEvents)
	}
}

func max(vars ...int) int {
	m := vars[0]
	for _, zz := range vars {
		if zz > m {
			m = zz
		}
	}
	return m
}
