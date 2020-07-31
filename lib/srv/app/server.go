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

package app

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"time"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/srv"
	"github.com/gravitational/teleport/lib/utils"

	"github.com/gravitational/trace"

	"github.com/jonboulle/clockwork"
	"github.com/sirupsen/logrus"
)

// RotationGetter returns rotation state.
type RotationGetter func(role teleport.Role) (*services.Rotation, error)

type Config struct {
	Clock clockwork.Clock

	AccessPoint  auth.AccessPoint
	Storage      *auth.ProcessStorage
	CloseContext context.Context
	GetRotation  RotationGetter

	App services.App
}

func (c *Config) CheckAndSetDefaults() error {
	if c.Clock == nil {
		c.Clock = clockwork.NewRealClock()
	}

	if c.AccessPoint == nil {
		return trace.BadParameter("access point is missing")
	}
	if c.Storage == nil {
		return trace.BadParameter("process storage is missing")
	}
	if c.GetRotation == nil {
		return trace.BadParameter("rotation getter is missing")
	}
	return nil
}

type Server struct {
	*Config

	log *logrus.Entry

	dynamicLabels *srv.DynamicLabels
	httpServer    *http.Server
	heartbeat     *srv.Heartbeat
}

func New(config *Config) (*Server, error) {
	componentName := fmt.Sprintf("%v.%v", teleport.ComponentApp, config.App.GetName())

	err := config.CheckAndSetDefaults()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	s := &Server{
		Config: config,
		log: logrus.WithFields(logrus.Fields{
			trace.Component: componentName,
		}),
	}

	// Create HTTP server that will be forwarding requests to target application.
	// TODO: Set timeouts and possibly host:port in "Addr".
	s.httpServer = &http.Server{}
	s.httpServer.Handler = s

	// Create dynamic labels looper that will keep dynamic labels updated.
	s.dynamicLabels, err = srv.NewDynamicLabels(&srv.DynamicLabelsConfig{
		Labels:        config.App.GetCommandLabels(),
		CloseContext:  config.CloseContext,
		ComponentName: componentName,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	// Create heartbeat loop so applications keep heartbeating presence to backend.
	s.heartbeat, err = srv.NewHeartbeat(srv.HeartbeatConfig{
		Mode:            srv.HeartbeatModeApp,
		Context:         config.CloseContext,
		Component:       componentName,
		Announcer:       config.AccessPoint,
		GetServerInfo:   s.GetServerInfo,
		KeepAlivePeriod: defaults.ServerKeepAliveTTL,
		AnnouncePeriod:  defaults.ServerAnnounceTTL/2 + utils.RandomDuration(defaults.ServerAnnounceTTL/10),
		CheckPeriod:     defaults.HeartbeatCheckPeriod,
		ServerTTL:       defaults.ServerAnnounceTTL,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}

	return s, nil
}

func (s *Server) GetServerInfo() (services.Resource, error) {
	// Return a updated list of dynamic labels.
	s.App.SetCommandLabels(s.dynamicLabels.Get())

	// Update the TTL.
	s.App.SetTTL(s.Clock, defaults.ServerAnnounceTTL)

	// Update rotation state.
	rotation, err := s.GetRotation(teleport.RoleApp)
	if err != nil {
		if !trace.IsNotFound(err) {
			s.log.Warningf("Failed to get rotation state: %v.", err)
		}
	} else {
		s.App.SetRotation(*rotation)
	}

	return s.App, nil
}

// Start starts heart beating the presence of service.Apps that this
// server is proxying along with any dynamic labels.
func (s *Server) Start() error {
	s.dynamicLabels.Async()
	go s.heartbeat.Run()

	return nil
}

// Serve accepts incoming connections on the Listener and calls the handler.
// Since this code is called from the reverse tunnel agent, the listener will
// be a single connection app.Listener.
func (s *Server) Serve(l net.Listener) error {
	if err := s.httpServer.Serve(l); err != nil {
		return trace.Wrap(err)
	}
	return nil
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "not implemented", http.StatusNotImplemented)
}

// TODO: It should be safe to call Close() (or Shutdown() below) twice.
func (s *Server) Close() error {
	if err := s.heartbeat.Close(); err != nil {
		s.log.Warnf("Failed to close heartbeat: %v.", err)
	}

	return nil
}

// TODO.
func (s *Server) Wait() error {
	time.Sleep(20 * time.Minute)
	return nil
}

func (s *Server) Shutdown(ctx context.Context) error {
	if err := s.heartbeat.Close(); err != nil {
		s.log.Warnf("Failed to close heartbeat: %v.", err)
	}

	return nil
}
