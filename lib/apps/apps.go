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

// Package apps implements Teleport Application Access Proxy (AAP) logic.
// TODO: What parts of AAP?
package apps

import (
	"context"

	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/auth"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/presence"
	"github.com/gravitational/teleport/lib/services"
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

type Service struct {
	*Config

	heartbeats []*presence.Heartbeat
}

func New(config *Config) (*Service, error) {
	err := config.CheckAndSetDefaults()
	if err != nil {
		return nil, trace.Wrap(err)
	}

	var heartbeats []*presence.Heartbeat

	for i := range config.Apps {
		appThisOne := config.Apps[i]
		heartbeat, err := presence.NewHeartbeat(presence.HeartbeatConfig{
			Mode:      presence.HeartbeatModeApp,
			Context:   config.CloseContext,
			Component: teleport.ComponentApps,
			Announcer: config.AccessPoint,
			//GetApp:    getApp,
			GetApp: func() (services.App, error) {
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

	return &Service{
		Config:     config,
		heartbeats: heartbeats,
	}, nil
}

func (s *Service) Start() error {
	for _, heartbeat := range s.heartbeats {
		go heartbeat.Run()
	}

	return nil
}

// TODO: It should be safe to call Close() (or Shutdown() below) twice.
func (s *Service) Close() error {
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

func (s *Service) Shutdown() error {
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
