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

func (s *MainTestSuite) TestOnLogin(c *check.C) {
	var tests = []struct {
		inProxyAddr   string
		inClusterName string
		out           string
	}{
		{
			inProxyAddr:   "localhost",
			inClusterName: "",
			//outProfileAddr: "",
			//outClusterName: "",
		},
	}

	for _, tt := range tests {
		profileDir := c.MkDir()
		defer os.RemoveAll(profileDir)

		config := &CLIConf{
			Proxy:            tt.inProxyAddr,
			SiteName:         tt.inClusterName,
			IdentityFormat:   identityfile.FormatFile,
			LoginFunc:        loginFunc,
			GetTrustedCAFunc: getTrustedCAFunc,
			ProfileDir:       profileDir,
		}
		onLogin(config)

		//web_proxy_addr: proxy.example.com:3080
		//ssh_proxy_addr: proxy.example.com:3023
		//kube_proxy_addr: kube.example.com:3026
		//user: rjones

		// > Profile URL:  https://proxy.example.com:3080
		//   Logged in as: rjones
		//   Cluster:      proxy.example.com
		//   Roles:        dev*
		//   Logins:       rjones
		//   Valid until:  2020-04-24 05:56:45 +0000 UTC [valid for 8h0m0s]
		//   Extensions:   permit-agent-forwarding, permit-pty
	}
}

// loginFunc is a custom Login function used to simulate a Teleport server
// response.
func loginFunc(ctx context.Context, activateKey bool) (*client.Key, error) {
	return &client.Key{
		Priv:    []byte(priv),
		Pub:     []byte(pub),
		Cert:    []byte(cert),
		TLSCert: []byte(tlsCert),
		///// ProxyHost (optionally) contains the hostname of the proxy server
		///// which issued this key
		///ProxyHost string
		///// TrustedCA is a list of trusted certificate authorities
		///TrustedCA []auth.TrustedCerts
		///// ClusterName is a cluster name this key is associated with
		///ClusterName string
	}, nil
}

// getTrustedCAFunc is a custom GetTrustedCA function used to simulate a
// Teleport server response.
func getTrustedCAFunc(ctx context.Context, clusterName string) ([]services.CertAuthority, error) {
	fmt.Printf("--> getTrustedCAFunc.\n")
	return nil, nil
}

const (
	priv = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA2KcFrvuCPSc+3KTm/Lc+iES+GXTJaf7yuV5hXgtj1G/Aan0k
v0jMUdpg7CN5ETBEax9zHHSXxHW1GpysfQz4nGnRwLb3KgzrhZgo2KKMvF+CnY7d
jMajtK3h9hYoZZckii03vk05Mf4fOJjd8feOOQFpI7dKNsKD5gUGqzGwno5+/lnb
F6qnGTDDqwNNvLEGwFUjDw5l4WnEZ8XGHSpFdHf8mbHSchMSh6y/BABNpgx4KX/v
9NcPJFcNN3SEWLNuGjzm0pJ97Zvh3gjxZ2mg1HB7rpYla1gb0SWaJ9KTnvXGbDEa
dH+K+kdGfe1uvOYuPDrT7BfNyc2Tz3hxEA0lgQIDAQABAoIBAQDCkdWH3baMhzds
XuhXY5ZUOTBkmj7c46tHENzu4dnJCofK2xLqe02L4UyUJhNvfWKktfziPE+kj3WT
Lcu3DrQjfOF0ap009Z97PjjIvcsYzcn3CDwuVqLk/BhnsmSbQA7/zTY3wRCxtiCB
6r/As+vVhE/RVKXg4fYk2LSxgJG3AmhWSglg0fIo9COdLmLhmnz80JMnzxXKuDNs
xb4DzaDYCpK24tb7Y0PAl28RSe0M398tLVrYNX0mfwbbfIn+B0g+6oRFBYvuac6S
OgQdVEH4qds28JWeDr+vvpS7Ogwfx7b1mFsfiguS485xtc6Pfys0IhHZuhNlf2pW
qrm3AVn1AoGBAPu3dArwZzDgtCu5PLLH32cKgWC/XpjnLKchoskQJu5A1Ug99pxI
K/bOc363d3CDq3BU9Nd6/L+dH57RvQi7PDYkHjBwGFVwvS6ozZ7eIl1mEZBrnpmD
7IrlT+m5zEyQSB6ZThgDMJY8j76pqOexdN/H/Dlh7uDFV7w23Fn2QaMzAoGBANxW
0dduRb/ut6qTj4x6D4K8nCi/50a51LvblwjkaE2n6xYGYM6pURIhDOMy1nDCDyMz
m81Si29Pa4hcnIf4Od4K9abxB4E/qzyMY6mrNRgY33cjjACHhBKLK3JarKiOmlli
El5PM/vve4cFsu4qkIvKLmf22/KJ8HpNhO1nLVR7AoGAEr9CDEKFXPWPVaZRJ/uM
3u7AXgVCtV6aS8RMjG8Ah0Qa3muG/3K8m4Aax/hAFAgqb45UQewuANNh9IEodAsF
2/5qpS7kERD5dg0qa0eeBZjBfCEXydUye9HCVuT4m0cvp9/BGja6mqXeCtQ1+TOV
QclyNo/dq63m7+SiGq0ljFMCgYEAxqFduh+msUe6OwObPMAsi2cMP5AAJjoQFOn4
VgPSI29k9g3551OryfQRch+6QRwwGUPFCGuJV2b5QYx7b/fN8uVeXoiag2GqNIM6
tRGqY3bIvNZGt5Ny9GSRXh1v2OP1MO7AMFSmQE+7xBTXIO0uMVaqTv6zeQnwx9Bq
LLn+m1ECgYEA15K07VEQ2bjwJLpLfUye9j/we/mcEHPju5HkccmiKJ2BlD8uWLaF
3ChrOtryKxEed6yhrzKRtH+CPbYSyHcgmUcsjidxJ5DKBl89bRvHXjzrBMkqKFKP
zVpCU4VorDd82D/VlJwWUZ0DKw79EldNHyi8Y4Nhv0HP8QEH4teEtnc=
-----END RSA PRIVATE KEY-----`

	pub = `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDYpwWu+4I9Jz7cpOb8tz6IRL4ZdMlp/vK5XmFeC2PUb8BqfSS/SMxR2mDsI3kRMERrH3McdJfEdbUanKx9DPicadHAtvcqDOuFmCjYooy8X4Kdjt2MxqO0reH2FihllySKLTe+TTkx/h84mN3x9445AWkjt0o2woPmBQarMbCejn7+WdsXqqcZMMOrA028sQbAVSMPDmXhacRnxcYdKkV0d/yZsdJyExKHrL8EAE2mDHgpf+/01w8kVw03dIRYs24aPObSkn3tm+HeCPFnaaDUcHuuliVrWBvRJZon0pOe9cZsMRp0f4r6R0Z97W685i48OtPsF83JzZPPeHEQDSWB`

	cert = `ssh-rsa-cert-v01@openssh.com AAAAHHNzaC1yc2EtY2VydC12MDFAb3BlbnNzaC5jb20AAAAgQQ/FcGhr8agEUalKTWL7i24rpjAdo4MyqVfTiWplhXIAAAADAQABAAABAQDYpwWu+4I9Jz7cpOb8tz6IRL4ZdMlp/vK5XmFeC2PUb8BqfSS/SMxR2mDsI3kRMERrH3McdJfEdbUanKx9DPicadHAtvcqDOuFmCjYooy8X4Kdjt2MxqO0reH2FihllySKLTe+TTkx/h84mN3x9445AWkjt0o2woPmBQarMbCejn7+WdsXqqcZMMOrA028sQbAVSMPDmXhacRnxcYdKkV0d/yZsdJyExKHrL8EAE2mDHgpf+/01w8kVw03dIRYs24aPObSkn3tm+HeCPFnaaDUcHuuliVrWBvRJZon0pOe9cZsMRp0f4r6R0Z97W685i48OtPsF83JzZPPeHEQDSWBAAAAAAAAAAAAAAABAAAAA2ZvbwAAAA8AAAADZm9vAAAABHJvb3QAAAAAAAAAAAAAAABeogk3AAAAAAAAADAAAAAWcGVybWl0LXBvcnQtZm9yd2FyZGluZwAAAAAAAAAKcGVybWl0LXB0eQAAAAAAAAAAAAABFwAAAAdzc2gtcnNhAAAAAwEAAQAAAQEAwBgwn+vkjCcKEr2fbX1mLN555B9amVYfD/fUZBNbXKpHaqYnlM2WlyRR+xCrU9H/X6xT+wKJs1tsxFbxdBc1RWJtaqz/VpQCjomOulBzwumzB5hTpJfGblGjkPvpt1zwfmKdpBg0jxXUHHR4u4N6OX0dxd0ImRQ4W9QUtEqzgqToS5u4iwpeg6i1SoAdHBaSeqYhK9+nGrrJBAl/HVSgvL9tGn/+cQqlOiQz0t61V20+oMBAP+rOTIiwRXn98iMKFjzVW1HTL5Lwit3oJQX0Lrd/I6tN2De6TJxbbOOkF45V/P/knBzbxV0fpnhcvZMnQqg1qdUmNVi6VC1O5qIPiwAAAQ8AAAAHc3NoLXJzYQAAAQACNXicoOQU1QowKZ6ZH0w36sz0CEY0GXMCKkNI4B19z0WdlsBTSbWEKimw/CUM9Wv5EcwXdeN0I6VWmp6TBMazSdj9lOsUfYdUP36/zC3eqlgNzH0ZGTypzHqAQcOoUNq9d3n251+mmOfDl4AJVDXq7cd87v+AQ/KVTxt4FCQFUCP/H4bfjwvpsAYftI8DW2J40NygLJ3yEy07u/HXUviFrOXO6c+8a1PVFhyisT88zWZfLZMfJBxmnYUM6MOij4mmwvZqIi2RZmULNKhTmZuAnfn9ILipTOkU8YYZIGIovLlMqW9eV3D7Bs/2OrcMUF7zpiUVaIGD3HXg91FQvzYU`

	tlsCert = `-----BEGIN CERTIFICATE-----
MIIDTDCCAjSgAwIBAgIRAPHI+4N3qcOGyznq/1HV9TQwDQYJKoZIhvcNAQELBQAw
WjESMBAGA1UEChMJbG9jYWxob3N0MRIwEAYDVQQDEwlsb2NhbGhvc3QxMDAuBgNV
BAUTJzI0MTk3ODQ3MjQ3MjI1NzYzMzU0MjQyMDA3NDQ5NDIxODI3MjQxMDAeFw0y
MDA0MjMyMTEwMzVaFw0yMDA0MjMyMTMxMzVaMCgxCTAHBgNVBAkTADENMAsGA1UE
ERMEbnVsbDEMMAoGA1UEAxMDZm9vMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEA2KcFrvuCPSc+3KTm/Lc+iES+GXTJaf7yuV5hXgtj1G/Aan0kv0jMUdpg
7CN5ETBEax9zHHSXxHW1GpysfQz4nGnRwLb3KgzrhZgo2KKMvF+CnY7djMajtK3h
9hYoZZckii03vk05Mf4fOJjd8feOOQFpI7dKNsKD5gUGqzGwno5+/lnbF6qnGTDD
qwNNvLEGwFUjDw5l4WnEZ8XGHSpFdHf8mbHSchMSh6y/BABNpgx4KX/v9NcPJFcN
N3SEWLNuGjzm0pJ97Zvh3gjxZ2mg1HB7rpYla1gb0SWaJ9KTnvXGbDEadH+K+kdG
fe1uvOYuPDrT7BfNyc2Tz3hxEA0lgQIDAQABoz8wPTAOBgNVHQ8BAf8EBAMCBaAw
HQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwDQYJ
KoZIhvcNAQELBQADggEBABCUEfq5YsgJRZ2R3a4aGZdRtEfmUP43wlYRFL0HDXZ0
mb2YK1/cE4uNnDX62+kCie34LXKULoka4jUbtZQdmJrah1YaJHte8Fdvgw1vmqlG
kaUUZkaumufXFB3en30Ih9hAdVDr56+zcCJ65qp8BZxLuz8iN/R3BJyshTrJRF2a
BLdDol1RSQTa/KxKXtMkaXbg47m6ulhImO+n48WbSom4rQdQOQqtxLhIyoqpCf1E
ifAZaKQXIBcXbw2dR22HNPW7LmV6L7pPNqNAUQbPGv9D1Z//flF2DBvbxEtQneTn
PuYkzN4EcUbBcOjF8XhiZmh952zc3BRoGfi4Jg2SSSU=
-----END CERTIFICATE-----`
)

//	IsUnderTest:      true,
