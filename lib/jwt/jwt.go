package jwt

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"time"

	"github.com/gravitational/trace"

	"github.com/pborman/uuid"
	"gopkg.in/square/go-jose.v2"
	"gopkg.in/square/go-jose.v2/jwt"
	josejwt "gopkg.in/square/go-jose.v2/jwt"
)

type Key struct {
	publicKey  *rsa.PublicKey
	privateKey *rsa.PrivateKey
}

func New(public []byte, private []byte) (*Key, error) {
	// Parse public and private key parts. Errors are ignored when the private
	// key is parsed because the private key is not required when the requester
	// only has permission to validate band not sign JWT tokens.
	publicKey, err := parsePublicKey(public)
	if err != nil {
		return nil, trace.Wrap(err)
	}
	privateKey, _ := parsePrivateKey(private)

	return &Key{
		publicKey:  publicKey,
		privateKey: privateKey,
	}, nil
}

type SignParams struct {
	Email string
}

func (k *Key) Sign(p *SignParams) (string, error) {
	if k.privateKey == nil {
		return "", trace.BadParameter("can not sign token with non-signing key")
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
			Subject:   uuid.New(),
			Issuer:    "Gravitational Teleport",
			NotBefore: jwt.NewNumericDate(time.Date(2016, 1, 1, 0, 0, 0, 0, time.UTC)),
		},
		Email: p.Email,
	}
	token, err := josejwt.Signed(sig).Claims(claims).CompactSerialize()
	if err != nil {
		return "", trace.Wrap(err)
	}
	return token, nil
}

func (k *Key) Verify(raw string) (*jwtClaims, error) {
	tok, err := josejwt.ParseSigned(raw)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var out jwtClaims
	if err := tok.Claims(k.publicKey, &out); err != nil {
		return nil, trace.Wrap(err)
	}

	return &out, nil
}

type Claims interface {
	GetEmail() string
}

type jwtClaims struct {
	josejwt.Claims
	Email string `json:"email"`
}

func (c *jwtClaims) GetEmail() string {
	return c.Email
}

func GenerateKeypair() ([]byte, []byte, error) {
	privateKey, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		return nil, nil, err
	}

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
		return nil, trace.BadParameter("failed to decode PEM block")
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
		return nil, trace.BadParameter("failed to decode PEM block containing public key")
	}

	privateKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return privateKey, nil
}
