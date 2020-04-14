// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package events

import (
	"bytes"
	"encoding/json"

	"github.com/gravitational/teleport/lib/utils"

	"github.com/gogo/protobuf/jsonpb"
	"github.com/gogo/protobuf/types"
	"github.com/gravitational/trace"
)

// EncodeMap encodes map[string]interface{} to map<string, Value>
func EncodeMap(msg map[string]interface{}) (*Struct, error) {
	data, err := json.Marshal(msg)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	pbs := types.Struct{}
	if err = jsonpb.Unmarshal(bytes.NewReader(data), &pbs); err != nil {
		return nil, trace.Wrap(err)
	}
	return &Struct{Struct: pbs}, nil
}

// MustEncodeMap panics if EncodeMap returns error
func MustEncodeMap(msg map[string]interface{}) *Struct {
	m, err := EncodeMap(msg)
	if err != nil {
		panic(err)
	}
	return m
}

// DecodeToMap converts a pb.Struct to a map from strings to Go types.
// DecodeToMap panics if s is invalid.
func DecodeToMap(s *types.Struct) (map[string]interface{}, error) {
	if s == nil {
		return nil, nil
	}
	m := map[string]interface{}{}
	for k, v := range s.Fields {
		var err error
		m[k], err = DecodeValue(v)
		if err != nil {
			return nil, trace.Wrap(err)
		}
	}
	return m, nil
}

// DecodeValue decodes proto value to golang type
func DecodeValue(v *types.Value) (interface{}, error) {
	switch k := v.Kind.(type) {
	case *types.Value_NullValue:
		return nil, nil
	case *types.Value_NumberValue:
		return k.NumberValue, nil
	case *types.Value_StringValue:
		return k.StringValue, nil
	case *types.Value_BoolValue:
		return k.BoolValue, nil
	case *types.Value_StructValue:
		return DecodeToMap(k.StructValue)
	case *types.Value_ListValue:
		s := make([]interface{}, len(k.ListValue.Values))
		for i, e := range k.ListValue.Values {
			var err error
			s[i], err = DecodeValue(e)
			if err != nil {
				return nil, trace.Wrap(err)
			}
		}
		return s, nil
	default:
		return nil, trace.BadParameter("protostruct: unknown kind %v", k)
	}
}

// Struct is a wrapper around types.Struct
// that marshals itself into json
type Struct struct {
	types.Struct
}

// MarshalJSON marshals boolean value.
func (s *Struct) MarshalJSON() ([]byte, error) {
	m, err := DecodeToMap(&s.Struct)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	return utils.FastMarshal(m)
}

// UnmarshalJSON unmarshals JSON from string or bool,
// in case if value is missing or not recognized, defaults to false
func (s *Struct) UnmarshalJSON(data []byte) error {
	if len(data) == 0 {
		return nil
	}
	err := jsonpb.Unmarshal(bytes.NewReader(data), &s.Struct)
	if err != nil {
		return trace.Wrap(err)
	}
	return nil
}

// GetID returns event ID
func (m *Metadata) GetID() string {
	return m.ID
}

// GetCode returns event code
func (m *Metadata) GetCode() string {
	return m.Code
}

// SetCode sets event code
func (m *Metadata) SetCode(code string) {
	m.Code = code
}

// SetID sets event ID
func (m *Metadata) SetID(id string) {
	m.ID = id
}

// GetServerID returns event server ID
func (m *ServerMetadata) GetServerID() string {
	return m.ServerID
}

// SetServerID sets event server ID
func (m *ServerMetadata) SetServerID(id string) {
	m.ServerID = id
}

// GetServerNamespace returns event server ID
func (m *ServerMetadata) GetServerNamespace() string {
	return m.ServerNamespace
}

// SetServerNamespace sets server namespace
func (m *ServerMetadata) SetServerNamespace(ns string) {
	m.ServerNamespace = ns
}
