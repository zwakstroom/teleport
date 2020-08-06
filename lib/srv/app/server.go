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
	"io"
	"net"
	"sync/atomic"

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

type RotationGetter func(role teleport.Role) (*services.Rotation, error)

// Config is the configuration for an application server.
type Config struct {
	// Clock used to control time.
	Clock clockwork.Clock

	// AccessPoint is a client connected to the Auth Server with the identity
	// teleport.RoleApp.
	AccessPoint auth.AccessPoint

	// CloseContext used to signal shutdown.
	CloseContext context.Context

	// GetRotation returns the certificate rotation state.
	GetRotation RotationGetter

	// App is the application this server will proxy.
	App services.Server
}

// CheckAndSetDefaults makes sure the configuration has the minimum required
// to function.
func (c *Config) CheckAndSetDefaults() error {
	if c.Clock == nil {
		c.Clock = clockwork.NewRealClock()
	}

	if c.AccessPoint == nil {
		return trace.BadParameter("access point is missing")
	}
	if c.GetRotation == nil {
		return trace.BadParameter("rotation getter is missing")
	}
	return nil
}

// Server is an application server.
type Server struct {
	*Config

	log          *logrus.Entry
	closeContext context.Context
	closeFunc    context.CancelFunc

	dynamicLabels *srv.DynamicLabels
	heartbeat     *srv.Heartbeat

	activeConns int64
}

// New returns a new application server.
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

	s.closeContext, s.closeFunc = context.WithCancel(config.CloseContext)

	// Create dynamic labels and sync them right away. This makes sure that the
	// first heartbeat has correct dynamic labels.
	s.dynamicLabels, err = srv.NewDynamicLabels(&srv.DynamicLabelsConfig{
		Labels:        config.App.GetCmdLabels(),
		CloseContext:  s.closeContext,
		ComponentName: componentName,
	})
	if err != nil {
		return nil, trace.Wrap(err)
	}
	s.dynamicLabels.Sync()

	// Create heartbeat loop so applications keep sending presence to backend.
	s.heartbeat, err = srv.NewHeartbeat(srv.HeartbeatConfig{
		Mode:            srv.HeartbeatModeApp,
		Context:         s.closeContext,
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

// GetServerInfo returns a services.Server representing the application. Used
// in heartbeat code.
func (s *Server) GetServerInfo() (services.Server, error) {
	// Return a updated list of dynamic labels.
	s.App.SetCmdLabels(s.dynamicLabels.Get())

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
	go s.dynamicLabels.Run()
	go s.heartbeat.Run()

	return nil
}

// Serve accepts incoming connections on the Listener and calls the handler.
// Since this code is called from the reverse tunnel agent, the listener will
// be a single connection app.Listener.
func (s *Server) HandleConnection(conn net.Conn) {
	go s.handleConnection(conn)
}

func (s *Server) handleConnection(channelConn net.Conn) {
	// Establish connection to target server.
	var d net.Dialer
	targetConn, err := d.DialContext(s.CloseContext, "tcp", s.App.GetInternalAddr())
	if err != nil {
		s.log.Errorf("Failed to connect to %v: %v.", s.App.GetName(), err)
		return
	}

	// Keep a count of the number of active connections. Used in tests to check
	// for go routine leaks.
	atomic.AddInt64(&s.activeConns, 1)
	defer atomic.AddInt64(&s.activeConns, -1)

	errorCh := make(chan error, 2)

	// Copy data between channel connection and connection to target application.
	go func() {
		defer targetConn.Close()
		defer channelConn.Close()

		_, err := io.Copy(targetConn, channelConn)
		errorCh <- err
	}()
	go func() {
		defer targetConn.Close()
		defer channelConn.Close()

		_, err := io.Copy(channelConn, targetConn)
		errorCh <- err
	}()

	// Block until copy is complete in either direction. The other direction
	// will get cleaned up automatically.
	if err = <-errorCh; err != nil && err != io.EOF {
		s.log.Errorf("Connection to %v closed due to an error: %v.", s.App.GetName(), err)
	}
}

// activeConnections returns the number of active connections being proxied.
// Used in tests.
func (s *Server) activeConnections() int64 {
	return atomic.LoadInt64(&s.activeConns)
}

// Close will shut the server down and unblock any resources.
func (s *Server) Close() error {
	if err := s.heartbeat.Close(); err != nil {
		return trace.Wrap(err)
	}

	s.dynamicLabels.Close()

	s.closeFunc()

	return nil
}

// Wait will block while the server is running.
func (s *Server) Wait() error {
	<-s.closeContext.Done()
	return s.closeContext.Err()
}
