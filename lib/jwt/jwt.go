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
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"time"

	"github.com/gravitational/trace"
	"github.com/jonboulle/clockwork"

	"gopkg.in/square/go-jose.v2"
	"gopkg.in/square/go-jose.v2/jwt"
	josejwt "gopkg.in/square/go-jose.v2/jwt"
)

// Config defines the clock and PEM encoded bytes of a public and private
// key that form a *jwt.Key.
type Config struct {
	// Clock is used to control expiry time.
	Clock clockwork.Clock

	// PublicKey is a PEM encoded key that can be used to verify a signed token.
	PublicKey []byte

	// PrivateKey is a PEM encoded key that can be used to sign and verify tokens.
	PrivateKey []byte
}

// CheckAndSetDefaults validates the values of a *Config.
func (c *Config) CheckAndSetDefaults() error {
	if c.Clock == nil {
		c.Clock = clockwork.NewRealClock()
	}
	if c.PrivateKey == nil && c.PublicKey == nil {
		return trace.BadParameter("public or private key is required")
	}
	return nil
}

// Key is a JWT key that can be used to sign and/or verify a token.
type Key struct {
	*Config

	publicKey  *rsa.PublicKey
	privateKey *rsa.PrivateKey
}

// New creates a JWT key that can be used to sign and verify tokens.
func New(config *Config) (*Key, error) {
	if err := config.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	privateKey, err := parsePrivateKey(config.PrivateKey)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	publicKey, ok := privateKey.Public().(*rsa.PublicKey)
	if !ok {
		return nil, trace.BadParameter("invalid public key")
	}

	return &Key{
		Config:     config,
		publicKey:  publicKey,
		privateKey: privateKey,
	}, nil
}

// NewPublic is a JWT key that can only be used to verify tokens.
func NewPublic(config *Config) (*Key, error) {
	if err := config.CheckAndSetDefaults(); err != nil {
		return nil, trace.Wrap(err)
	}

	publicKey, err := parsePublicKey(config.PublicKey)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &Key{
		Config:    config,
		publicKey: publicKey,
	}, nil
}

// SignParams are the claims to be embedded within the JWT token.
type SignParams struct {
	// Username is the Teleport identity.
	Username string

	// Roles are the roles assigned to the user within Teleport.
	Roles []string

	// Expiry is time to live for the token.
	Expiry time.Duration
}

// Check verifies all the values are valid.
func (p *SignParams) Check() error {
	if p.Username == "" {
		return trace.BadParameter("missing username")
	}
	if len(p.Roles) == 0 {
		return trace.BadParameter("missing roles")
	}
	if p.Expiry == 0 {
		return trace.BadParameter("expiry required")
	}

	return nil
}

// Sign will return a signed JSON token with the passed in claims embedded
// within the token.
func (k *Key) Sign(p *SignParams) (string, error) {
	if k.privateKey == nil {
		return "", trace.BadParameter("can not sign token with non-signing key")
	}
	if err := p.Check(); err != nil {
		return "", trace.Wrap(err)
	}

	signingKey := jose.SigningKey{
		Algorithm: jose.RS256,
		Key:       k.privateKey,
	}

	sig, err := jose.NewSigner(signingKey, (&jose.SignerOptions{}).WithType("JWT"))
	if err != nil {
		return "", trace.Wrap(err)
	}

	claims := jwtClaims{
		Claims: josejwt.Claims{
			Subject:   p.Username,
			Issuer:    "Gravitational Teleport",
			NotBefore: jwt.NewNumericDate(k.Clock.Now().Add(-10 * time.Second)),
			Expiry:    jwt.NewNumericDate(k.Clock.Now().Add(p.Expiry)),
		},
		Username: p.Username,
		Roles:    p.Roles,
	}
	token, err := josejwt.Signed(sig).Claims(claims).CompactSerialize()
	if err != nil {
		return "", trace.Wrap(err)
	}
	return token, nil
}

// Verify will validate the passed in JWT token.
func (k *Key) Verify(raw string) (*jwtClaims, error) {
	if k.publicKey == nil {
		return nil, trace.BadParameter("can not verify token without public key")
	}

	tok, err := josejwt.ParseSigned(raw)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var out jwtClaims
	if err := tok.Claims(k.publicKey, &out); err != nil {
		return nil, trace.Wrap(err)
	}

	expectedClaims := jwt.Expected{
		Time: k.Clock.Now(),
	}
	if err = out.Validate(expectedClaims); err != nil {
		return nil, trace.Wrap(err)
	}

	return &out, nil
}

// Claims defines the properties that can be extracted from a JWT token.
type Claims interface {
	// GetUsername returns the Teleport identity of the user.
	GetUsername() string

	// GetRoles returns the list of roles assigned to the user within Teleport.
	GetRoles() []string
}

type jwtClaims struct {
	josejwt.Claims

	Username string   `json:"username"`
	Roles    []string `json:"roles"`
}

// GetUsername returns the Teleport identity of the user.
func (c *jwtClaims) GetUsername() string {
	return c.Username
}

// GetRoles returns the list of roles assigned to the user within Teleport.
func (c *jwtClaims) GetRoles() []string {
	return c.Roles
}

// GenerateKeypair is used to generate a public and private key pair that can
// be used to form a JWT key.
func GenerateKeypair() ([]byte, []byte, error) {
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}

	public, private, err := MarshalKeypair(privateKey)
	if err != nil {
		return nil, nil, trace.Wrap(err)
	}

	return public, private, nil
}

// MarshalKeypair will take a *rsa.PrivateKey and return PEM encoded public
// and private key parts.
func MarshalKeypair(privateKey *rsa.PrivateKey) ([]byte, []byte, error) {
	private := pem.EncodeToMemory(&pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	})

	publicKey, ok := privateKey.Public().(*rsa.PublicKey)
	if !ok {
		return nil, nil, fmt.Errorf("invalid key type: %T", publicKey)
	}
	public := pem.EncodeToMemory(&pem.Block{
		Type:  "RSA PUBLIC KEY",
		Bytes: x509.MarshalPKCS1PublicKey(publicKey),
	})

	return public, private, nil
}

func parsePublicKey(public []byte) (*rsa.PublicKey, error) {
	block, _ := pem.Decode(public)
	if block == nil || block.Type != "RSA PUBLIC KEY" {
		return nil, trace.BadParameter("failed to decode public key PEM block")
	}

	publicKey, err := x509.ParsePKCS1PublicKey(block.Bytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return publicKey, nil
}

func parsePrivateKey(private []byte) (*rsa.PrivateKey, error) {
	block, _ := pem.Decode(private)
	if block == nil || block.Type != "RSA PRIVATE KEY" {
		return nil, trace.BadParameter("failed to decode private key PEM block")
	}

	privateKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return privateKey, nil
}
