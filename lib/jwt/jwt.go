package jwt

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"time"

	"github.com/gravitational/trace"

	"gopkg.in/square/go-jose.v2"
	"gopkg.in/square/go-jose.v2/jwt"
	josejwt "gopkg.in/square/go-jose.v2/jwt"
)

type Key struct {
	privateKey rsa.PrivateKey
}

func New(privateKey []byte) (*Key, error) {
	// TODO: Does "rest" (second return value) need to actually be used?
	block, _ := pem.Decode(privateKey)
	if block == nil || block.Type != "RSA PRIVATE KEY" {
		return nil, trace.BadParameter("failed to decode PEM block containing public key")
	}

	key, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return &Key{
		privateKey: *key,
	}, nil
}

type SignParams struct {
	Email string
}

func (k *Key) Sign(p *SignParams) (string, error) {
	signingKey := jose.SigningKey{
		Algorithm: jose.RS256,
		Key:       k.privateKey,
	}

	sig, err := jose.NewSigner(signingKey, (&jose.SignerOptions{}).WithType("JWT"))
	if err != nil {
		return "", trace.Wrap(err)
	}

	cl := josejwt.Claims{
		// TODO: Add in email!
		Subject:   "subject",
		Issuer:    "Gravitational Teleport",
		NotBefore: jwt.NewNumericDate(time.Date(2016, 1, 1, 0, 0, 0, 0, time.UTC)),
		Audience:  jwt.Audience{"leela", "fry"},
	}
	raw, err := josejwt.Signed(sig).Claims(cl).CompactSerialize()
	if err != nil {
		return "", trace.Wrap(err)
	}

	return raw, nil
}

func (k *Key) Verify(raw string) error {
	tok, err := josejwt.ParseSigned(raw)
	if err != nil {
		return trace.Wrap(err)
	}

	out := jwt.Claims{}
	if err := tok.Claims(k.privateKey, &out); err != nil {
		return trace.Wrap(err)
	}

	return nil

}
