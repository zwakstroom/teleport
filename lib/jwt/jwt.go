package jwt

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"time"

	"github.com/gravitational/trace"

	"github.com/pborman/uuid"
	"gopkg.in/square/go-jose.v2"
	"gopkg.in/square/go-jose.v2/jwt"
	josejwt "gopkg.in/square/go-jose.v2/jwt"
)

type Key struct {
	privateKey *rsa.PrivateKey
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
		privateKey: key,
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

	//standardClaims := josejwt.Claims{
	//	Subject:   uuid.New(),
	//	Issuer:    "Gravitational Teleport",
	//	NotBefore: jwt.NewNumericDate(time.Date(2016, 1, 1, 0, 0, 0, 0, time.UTC)),
	//}
	rclaims := teleportClaims{
		Claims: josejwt.Claims{
			Subject:   uuid.New(),
			Issuer:    "Gravitational Teleport",
			NotBefore: jwt.NewNumericDate(time.Date(2016, 1, 1, 0, 0, 0, 0, time.UTC)),
		},
		Email: p.Email,
	}
	//claims := josejwt.Signed(sig).Claims(standardClaims).Claims(teleportClaims)
	claims := josejwt.Signed(sig).Claims(rclaims)

	raw, err := claims.CompactSerialize()
	if err != nil {
		return "", trace.Wrap(err)
	}
	return raw, nil
}

type Claims interface {
	GetEmail() string
}

type teleportClaims struct {
	josejwt.Claims
	Email string `json:"email"`
}

func (c *teleportClaims) GetEmail() string {
	return c.Email
}

func (k *Key) Verify(raw string) (Claims, error) {
	tok, err := josejwt.ParseSigned(raw)
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var out teleportClaims
	if err := tok.Claims(k.privateKey.Public(), &out); err != nil {
		return nil, trace.Wrap(err)
	}

	return &out, nil
}
