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
	"encoding/json"
	"reflect"
	"time"

	"gopkg.in/check.v1"

	"github.com/gravitational/teleport/lib/fixtures"
	"github.com/gravitational/teleport/lib/utils"
)

type EventsTestSuite struct {
	dataDir string
}

var _ = check.Suite(&EventsTestSuite{})

// TestJSON tests JSON marshal events
func (a *EventsTestSuite) TestJSON(c *check.C) {
	type testCase struct {
		name  string
		json  string
		event interface{}
	}
	testCases := []testCase{
		{
			name: "session start event",
			json: `{"ei":0,"event":"session.start","uid":"36cee9e9-9a80-4c32-9163-3d9241cdac7a","code":"T2000I","time":"2020-03-30T15:58:54.561Z","namespace":"default","sid":"5b3555dc-729f-11ea-b66a-507b9dd95841","login":"bob","user":"bob@example.com","server_id":"a7c54b0c-469c-431e-af4d-418cd3ae9694","server_hostname":"planet","server_labels":{"group":"gravitational/devc","kernel":"5.3.0-42-generic","date":"Mon Mar 30 08:58:54 PDT 2020"},"addr.local":"127.0.0.1:3022","addr.remote":"[::1]:37718","size":"80:25"}`,
			event: SessionStart{
				Metadata: Metadata{
					Index: 0,
					Type:  SessionStartEvent,
					ID:    "36cee9e9-9a80-4c32-9163-3d9241cdac7a",
					Code:  SessionStartCode,
					Time:  time.Date(2020, 03, 30, 15, 58, 54, 561*int(time.Millisecond), time.UTC),
				},
				ServerMetadata: ServerMetadata{
					ServerID: "a7c54b0c-469c-431e-af4d-418cd3ae9694",
					ServerLabels: map[string]string{
						"kernel": "5.3.0-42-generic",
						"date":   "Mon Mar 30 08:58:54 PDT 2020",
						"group":  "gravitational/devc",
					},
					ServerHostname: "planet",
				},
				SessionMetadata: SessionMetadata{
					Namespace: "default",
					SessionID: "5b3555dc-729f-11ea-b66a-507b9dd95841",
					User:      "bob@example.com",
					Login:     "bob",
				},
				ConnectionMetadata: ConnectionMetadata{
					LocalAddr:  "127.0.0.1:3022",
					RemoteAddr: "[::1]:37718",
				},
				TerminalSize: "80:25",
			},
		},
		{
			name: "resize event",
			json: `{"time":"2020-03-30T15:58:54.564Z","uid":"c34e512f-e6cb-44f1-ab94-4cea09002d29","event":"resize","login":"bob","sid":"5b3555dc-729f-11ea-b66a-507b9dd95841","size":"194:59","ei":1,"code":"T2002I","namespace":"default","server_id":"a7c54b0c-469c-431e-af4d-418cd3ae9694","user":"bob@example.com"}`,
			event: Resize{
				Metadata: Metadata{
					Index: 1,
					Type:  ResizeEvent,
					ID:    "c34e512f-e6cb-44f1-ab94-4cea09002d29",
					Code:  TerminalResizeCode,
					Time:  time.Date(2020, 03, 30, 15, 58, 54, 564*int(time.Millisecond), time.UTC),
				},
				ServerMetadata: ServerMetadata{
					ServerID: "a7c54b0c-469c-431e-af4d-418cd3ae9694",
				},
				SessionMetadata: SessionMetadata{
					Namespace: "default",
					SessionID: "5b3555dc-729f-11ea-b66a-507b9dd95841",
					User:      "bob@example.com",
					Login:     "bob",
				},
				TerminalSize: "194:59",
			},
		},
		{
			name: "session end event",
			json: `{"time":"2020-03-30T15:58:54.564Z","uid":"c34e512f-e6cb-44f1-ab94-4cea09002d29","event":"resize","login":"bob","sid":"5b3555dc-729f-11ea-b66a-507b9dd95841","size":"194:59","ei":1,"code":"T2002I","namespace":"default","server_id":"a7c54b0c-469c-431e-af4d-418cd3ae9694","user":"bob@example.com"}`,
			event: Resize{
				Metadata: Metadata{
					Index: 1,
					Type:  ResizeEvent,
					ID:    "c34e512f-e6cb-44f1-ab94-4cea09002d29",
					Code:  TerminalResizeCode,
					Time:  time.Date(2020, 03, 30, 15, 58, 54, 564*int(time.Millisecond), time.UTC),
				},
				ServerMetadata: ServerMetadata{
					ServerID: "a7c54b0c-469c-431e-af4d-418cd3ae9694",
				},
				SessionMetadata: SessionMetadata{
					Namespace: "default",
					SessionID: "5b3555dc-729f-11ea-b66a-507b9dd95841",
					User:      "bob@example.com",
					Login:     "bob",
				},
				TerminalSize: "194:59",
			},
		},
		{
			name: "session print event",
			json: `{"time":"2020-03-30T15:58:56.959Z","event":"print","bytes":1551,"ms":2284,"offset":1957,"ei":11,"ci":9}`,
			event: SessionPrint{
				Metadata: Metadata{
					Index: 11,
					Type:  SessionPrintEvent,
					Time:  time.Date(2020, 03, 30, 15, 58, 56, 959*int(time.Millisecond), time.UTC),
				},
				ChunkIndex:        9,
				Bytes:             1551,
				DelayMilliseconds: 2284,
				Offset:            1957,
			},
		},
		{
			name: "session command event",
			json: `{"argv":["/usr/bin/lesspipe"],"login":"alice","path":"/usr/bin/dirname","return_code":0,"time":"2020-03-30T15:58:54.65Z","user":"alice@example.com","code":"T4000I","event":"session.command","pid":31638,"server_id":"a7c54b0c-469c-431e-af4d-418cd3ae9694","uid":"4f725f11-e87a-452f-96ec-ef93e9e6a260","cgroup_id":4294971450,"ppid":31637,"program":"dirname","namespace":"default","sid":"5b3555dc-729f-11ea-b66a-507b9dd95841","ei":4}`,
			event: SessionCommand{
				Metadata: Metadata{
					Index: 4,
					ID:    "4f725f11-e87a-452f-96ec-ef93e9e6a260",
					Type:  SessionCommandEvent,
					Time:  time.Date(2020, 03, 30, 15, 58, 54, 650*int(time.Millisecond), time.UTC),
					Code:  SessionCommandCode,
				},
				ServerMetadata: ServerMetadata{
					ServerID: "a7c54b0c-469c-431e-af4d-418cd3ae9694",
				},
				SessionMetadata: SessionMetadata{
					Namespace: "default",
					SessionID: "5b3555dc-729f-11ea-b66a-507b9dd95841",
					User:      "alice@example.com",
					Login:     "alice",
				},
				BPFMetadata: BPFMetadata{
					CgroupID: 4294971450,
					Program:  "dirname",
					PID:      31638,
				},
				PPID:       31637,
				ReturnCode: 0,
				Path:       "/usr/bin/dirname",
				Argv:       []string{"/usr/bin/lesspipe"},
			},
		},
	}
	for i, tc := range testCases {
		comment := check.Commentf("Test case %v: %v", i, tc.name)
		outJSON, err := utils.FastMarshal(tc.event)
		c.Assert(err, check.IsNil, comment)

		var out map[string]interface{}
		err = json.Unmarshal(outJSON, &out)
		c.Assert(err, check.IsNil, comment)

		// JSON key order is not deterministic when marshaling,
		// this code makes sure intermediate representation is equal
		var expected map[string]interface{}
		err = json.Unmarshal([]byte(tc.json), &expected)
		c.Assert(err, check.IsNil, comment)

		fixtures.DeepCompareMaps(c, out, expected)

		// unmarshal back into the type and compare the values
		outEvent := reflect.New(reflect.TypeOf(tc.event))
		err = json.Unmarshal(outJSON, outEvent.Interface())
		c.Assert(err, check.IsNil, comment)

		fixtures.DeepCompare(c, outEvent.Elem().Interface(), tc.event)
	}
}
