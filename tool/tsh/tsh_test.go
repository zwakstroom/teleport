/*
Copyright 2015-2017 Gravitational, Inc.

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

package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"net"
	"os"
	"testing"
	"time"

	"golang.org/x/crypto/ssh"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/client"
	"github.com/gravitational/teleport/lib/client/identityfile"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/gravitational/teleport/tool/tsh/common"

	"gopkg.in/check.v1"
)

// bootstrap check
func TestTshMain(t *testing.T) {
	utils.InitLoggerForTests()
	check.TestingT(t)
}

// register test suite
type MainTestSuite struct{}

var _ = check.Suite(&MainTestSuite{})

func (s *MainTestSuite) SetUpSuite(c *check.C) {
	dir := client.FullProfilePath("")
	os.RemoveAll(dir)
}

func (s *MainTestSuite) TestMakeClient(c *check.C) {
	var conf CLIConf

	// empty config won't work:
	tc, err := makeClient(&conf, true)
	c.Assert(tc, check.IsNil)
	c.Assert(err, check.NotNil)

	// minimal configuration (with defaults)
	conf.Proxy = "proxy"
	conf.UserHost = "localhost"
	tc, err = makeClient(&conf, true)
	c.Assert(err, check.IsNil)
	c.Assert(tc, check.NotNil)
	c.Assert(tc.Config.SSHProxyAddr, check.Equals, "proxy:3023")
	c.Assert(tc.Config.WebProxyAddr, check.Equals, "proxy:3080")
	localUser, err := client.Username()
	c.Assert(err, check.IsNil)
	c.Assert(tc.Config.HostLogin, check.Equals, localUser)
	c.Assert(tc.Config.KeyTTL, check.Equals, defaults.CertDuration)

	// specific configuration
	conf.MinsToLive = 5
	conf.UserHost = "root@localhost"
	conf.NodePort = 46528
	conf.LocalForwardPorts = []string{"80:remote:180"}
	conf.DynamicForwardedPorts = []string{":8080"}
	tc, err = makeClient(&conf, true)
	c.Assert(err, check.IsNil)
	c.Assert(tc.Config.KeyTTL, check.Equals, time.Minute*time.Duration(conf.MinsToLive))
	c.Assert(tc.Config.HostLogin, check.Equals, "root")
	c.Assert(tc.Config.LocalForwardPorts, check.DeepEquals, client.ForwardedPorts{
		{
			SrcIP:    "127.0.0.1",
			SrcPort:  80,
			DestHost: "remote",
			DestPort: 180,
		},
	})
	c.Assert(tc.Config.DynamicForwardedPorts, check.DeepEquals, client.DynamicForwardedPorts{
		{
			SrcIP:   "127.0.0.1",
			SrcPort: 8080,
		},
	})
}

func (s *MainTestSuite) TestIdentityRead(c *check.C) {
	// 3 different types of identities
	ids := []string{
		"cert-key.pem", // cert + key concatenated togther, cert first
		"key-cert.pem", // cert + key concatenated togther, key first
		"key",          // two separate files: key and key-cert.pub
	}
	for _, id := range ids {
		// test reading:
		k, cb, err := common.LoadIdentity(fmt.Sprintf("../../fixtures/certs/identities/%s", id))
		c.Assert(err, check.IsNil)
		c.Assert(k, check.NotNil)
		c.Assert(cb, check.IsNil)

		// test creating an auth method from the key:
		am, err := authFromIdentity(k)
		c.Assert(err, check.IsNil)
		c.Assert(am, check.NotNil)
	}
	k, _, err := common.LoadIdentity("../../fixtures/certs/identities/lonekey")
	c.Assert(k, check.IsNil)
	c.Assert(err, check.NotNil)

	// lets read an indentity which includes a CA cert
	k, hostAuthCallback, err := common.LoadIdentity("../../fixtures/certs/identities/key-cert-ca.pem")
	c.Assert(err, check.IsNil)
	c.Assert(k, check.NotNil)
	c.Assert(hostAuthCallback, check.NotNil)
	// prepare the cluster CA separately
	certBytes, err := ioutil.ReadFile("../../fixtures/certs/identities/ca.pem")
	c.Assert(err, check.IsNil)
	_, hosts, cert, _, _, err := ssh.ParseKnownHosts(certBytes)
	c.Assert(err, check.IsNil)
	var a net.Addr
	// host auth callback must succeed
	err = hostAuthCallback(hosts[0], a, cert)
	c.Assert(err, check.IsNil)

	// load an identity which include TLS certificates
	k, _, err = common.LoadIdentity("../../fixtures/certs/identities/tls.pem")
	c.Assert(err, check.IsNil)
	c.Assert(k, check.NotNil)
	c.Assert(k.TLSCert, check.NotNil)
	// generate a TLS client config
	conf, err := k.ClientTLSConfig()
	c.Assert(err, check.IsNil)
	c.Assert(conf, check.NotNil)
	// ensure that at least root CA was successfully loaded
	if len(conf.RootCAs.Subjects()) < 1 {
		c.Errorf("Failed to load TLS CAs from identity file")
	}
}

func (s *MainTestSuite) TestOptions(c *check.C) {
	tests := []struct {
		inOptions  []string
		outError   bool
		outOptions Options
	}{
		// Valid
		{
			inOptions: []string{
				"AddKeysToAgent yes",
			},
			outError: false,
			outOptions: Options{
				AddKeysToAgent:        true,
				ForwardAgent:          false,
				RequestTTY:            false,
				StrictHostKeyChecking: true,
			},
		},
		// Valid
		{
			inOptions: []string{
				"AddKeysToAgent=yes",
			},
			outError: false,
			outOptions: Options{
				AddKeysToAgent:        true,
				ForwardAgent:          false,
				RequestTTY:            false,
				StrictHostKeyChecking: true,
			},
		},
		// Invalid value.
		{
			inOptions: []string{
				"AddKeysToAgent foo",
			},
			outError:   true,
			outOptions: Options{},
		},
		// Invalid key.
		{
			inOptions: []string{
				"foo foo",
			},
			outError:   true,
			outOptions: Options{},
		},
		// Incomplete option.
		{
			inOptions: []string{
				"AddKeysToAgent",
			},
			outError:   true,
			outOptions: Options{},
		},
	}

	for _, tt := range tests {
		options, err := parseOptions(tt.inOptions)
		if tt.outError {
			c.Assert(err, check.NotNil)
			continue
		} else {
			c.Assert(err, check.IsNil)
		}

		c.Assert(options.AddKeysToAgent, check.Equals, tt.outOptions.AddKeysToAgent)
		c.Assert(options.ForwardAgent, check.Equals, tt.outOptions.ForwardAgent)
		c.Assert(options.RequestTTY, check.Equals, tt.outOptions.RequestTTY)
		c.Assert(options.StrictHostKeyChecking, check.Equals, tt.outOptions.StrictHostKeyChecking)
	}
}

// TestOnLoginProfileSwitch tests that "tsh login" supports switching of profiles.
func (s *MainTestSuite) TestOnLogin(c *check.C) {
	var tests = []struct {
		inProxyAddr    string
		inClusterName  string
		outClusterName string
	}{
		// Check that "tsh --proxy=example.com login" selects "example.com" cluster.
		{
			inProxyAddr:    "example.com",
			inClusterName:  "",
			outClusterName: "example.com",
		},
		// Check that "tsh --proxy=example.com login remote.example.com" selects
		// "remote.example.com" cluster.
		{
			inProxyAddr:    "example.com",
			inClusterName:  "remote.example.com",
			outClusterName: "remote.example.com",
		},
	}

	for _, tt := range tests {
		// Create a temporary directory to save profile to.
		profileDir := c.MkDir()
		defer os.RemoveAll(profileDir)

		// Perform "tsh login".
		config := &CLIConf{
			Proxy:            tt.inProxyAddr,
			SiteName:         tt.inClusterName,
			IdentityFormat:   identityfile.FormatFile,
			LoginFunc:        loginFunc,
			GetTrustedCAFunc: getTrustedCAFunc,
			ProfileDir:       profileDir,
		}
		onLogin(config)

		// Check status of logged in profile.
		profile, _, err := client.Status(profileDir, tt.inProxyAddr)
		c.Assert(err, check.IsNil)

		// Make sure profile has been updated with correct cluster.
		c.Assert(profile.Cluster, check.Equals, tt.outClusterName)
	}
}

// loginFunc is a custom Login function used to simulate a Teleport server
// response. Returns hard coded credentials.
//
// Tests do not check content of certificates at the moment. When that
// functionality is added, this function should be updated to generate keys
// and certificates.
func loginFunc(ctx context.Context) (*client.Key, error) {
	return &client.Key{
		Priv:    []byte(privateKey),
		Cert:    []byte(sshCertificate),
		TLSCert: []byte(tlsCertificate),
	}, nil
}

// getTrustedCAFunc is a custom GetTrustedCA function used to simulate a
// Teleport server response.
//
// Note, tests do not check content of certificates at the moment. When that
// functionality is added, this function should be updated to generate keys
// and certificates.
func getTrustedCAFunc(ctx context.Context, clusterName string) ([]services.CertAuthority, error) {
	// Dummy public and private keys for CA.
	signingKeys := [][]byte{[]byte(privateKey)}
	checkingKeys := [][]byte{[]byte(sshCertificate)}
	roles := []string{string(teleport.RoleNode)}

	// Create and return CA.
	ca := services.NewCertAuthority(services.HostCA, clusterName, signingKeys, checkingKeys, roles)
	return []services.CertAuthority{ca}, nil
}
