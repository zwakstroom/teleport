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

package jwt

import (
	"fmt"
	"testing"

	"github.com/gravitational/teleport/lib/utils"

	"gopkg.in/check.v1"
)

type Suite struct{}

var _ = fmt.Printf
var _ = check.Suite(&Suite{})

func TestJWT(t *testing.T) { check.TestingT(t) }

func (s *Suite) SetUpSuite(c *check.C) {
	utils.InitLoggerForTests()
}
func (s *Suite) TearDownSuite(c *check.C) {}
func (s *Suite) SetUpTest(c *check.C)     {}
func (s *Suite) TearDownTest(c *check.C)  {}

func (s *Suite) TestSignAndVerify(c *check.C) {
	pem, err := utils.GenerateJWTKeypair()
	c.Assert(err, check.IsNil)

	key, err := New(pem)
	c.Assert(err, check.IsNil)

	token, err := key.Sign(&SignParams{
		Email: "foo@example.com",
	})
	c.Assert(err, check.IsNil)

	claims, err := key.Verify(token)
	c.Assert(err, check.IsNil)
	c.Assert(claims.GetEmail(), check.Equals, "foo@example.com")
}
