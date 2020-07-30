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

var log = logrus.WithFields(logrus.Fields{
	trace.Component: teleport.ComponentApps,
})

type Config struct {
	Clock clockwork.Clock

	AccessPoint  auth.AccessPoint
	Storage      *auth.ProcessStorage
	CloseContext context.Context

	Apps []services.App
}

func (c *Config) CheckAndSetDefaults() error {
	if c.Clock == nil {
		c.Clock = clockwork.NewRealClock()
	}

	return nil
}

type Server struct {
	*Config

	httpServer *http.Server

	// heartbeat sends updates about this server
	// back to auth server
	heartbeats []*srv.Heartbeat
}

func New(config *Config) (*Server, error) {
	err := config.CheckAndSetDefaults()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	server := &Server{
		Config: config,
	}

	server.httpServer = &http.Server{
		//Addr:           ":8080",
		Handler: server,
		// TODO: Set timeouts.
	}

	var heartbeats []*srv.Heartbeat

	for i := range config.Apps {
		appThisOne := config.Apps[i]
		heartbeat, err := srv.NewHeartbeat(srv.HeartbeatConfig{
			Mode:      srv.HeartbeatModeApp,
			Context:   config.CloseContext,
			Component: teleport.ComponentApps,
			Announcer: config.AccessPoint,
			GetServerInfo: func() (services.Resource, error) {
				return appThisOne, nil
				//app := services.AppV3{
				//	Kind:    services.KindApp,
				//	Version: services.V3,
				//	Metadata: services.Metadata{
				//		Namespace: defaults.Namespace,
				//		Name:      "jenkins",
				//	},
				//	Spec: services.AppSpecV3{
				//		HostUUID:   "00000000-0000-0000-0000-000000000000",
				//		Protocol:   "https",
				//		URI:        "localhost:8080",
				//		PublicAddr: "jenkins.example.com",
				//		Version:    teleport.Version,
				//	},
				//}
				//state, err := config.Storage.GetState(teleport.RoleAdmin)
				//if err != nil {
				//	if !trace.IsNotFound(err) {
				//		log.Warningf("Failed to get rotation state: %v.", err)
				//		return nil, trace.Wrap(err)
				//	}
				//} else {
				//	app.Spec.Rotation = state.Spec.Rotation
				//}
				//app.SetTTL(config.Clock, defaults.ServerAnnounceTTL)
				//return &app, nil
			},
			KeepAlivePeriod: defaults.ServerKeepAliveTTL,
			AnnouncePeriod:  defaults.ServerAnnounceTTL/2 + utils.RandomDuration(defaults.ServerAnnounceTTL/10),
			CheckPeriod:     defaults.HeartbeatCheckPeriod,
			ServerTTL:       defaults.ServerAnnounceTTL,
		})
		if err != nil {
			return nil, trace.Wrap(err)
		}
		heartbeats = append(heartbeats, heartbeat)
	}

	return server, nil
}

// Start starts heart beating the presence of service.Apps that this
// server is proxying along with any dynamic labels.
func (s *Server) Start() error {
	for _, heartbeat := range s.heartbeats {
		go heartbeat.Run()
	}

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
	for _, heartbeat := range s.heartbeats {
		if heartbeat != nil {
			if err := heartbeat.Close(); err != nil {
				log.Warnf("Failed to close heartbeat: %v.", err)
			}
			heartbeat = nil
		}
	}

	return nil
}

// TODO.
func (s *Server) Wait() error {
	time.Sleep(20 * time.Minute)
	return nil
}

func (s *Server) Shutdown(ctx context.Context) error {
	for _, heartbeat := range s.heartbeats {
		if heartbeat != nil {
			if err := heartbeat.Close(); err != nil {
				log.Warnf("Failed to close heartbeat: %v.", err)
			}
			heartbeat = nil
		}
	}

	return nil
}
