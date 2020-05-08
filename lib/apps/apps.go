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
	"github.com/gravitational/teleport"
	"github.com/gravitational/teleport/lib/defaults"
	"github.com/gravitational/teleport/lib/services"
	"github.com/gravitational/teleport/lib/srv"
	"github.com/gravitational/teleport/lib/utils"
	"github.com/gravitational/trace"
	"github.com/sirupsen/logrus"
)

var log = logrus.WithFields(logrus.Fields{
	trace.Component: teleport.ComponentApps,
})

type Service struct {
}

func New() (*Service, error) {
	return &Service{}, nil
}

func (s *Service) Start() {
	heartbeat, err := srv.NewHeartbeat(srv.HeartbeatConfig{
		Mode:      srv.HeartbeatModeAuth,
		Context:   process.ExitContext(),
		Component: teleport.ComponentAuth,
		Announcer: authServer,
		GetServerInfo: func() (services.Server, error) {
			srv := services.ServerV2{
				Kind:    services.KindAuthServer,
				Version: services.V2,
				Metadata: services.Metadata{
					Namespace: defaults.Namespace,
					Name:      process.Config.HostUUID,
				},
				Spec: services.ServerSpecV2{
					Addr:     authAddr,
					Hostname: process.Config.Hostname,
					Version:  teleport.Version,
				},
			}
			state, err := process.storage.GetState(teleport.RoleAdmin)
			if err != nil {
				if !trace.IsNotFound(err) {
					log.Warningf("Failed to get rotation state: %v.", err)
					return nil, trace.Wrap(err)
				}
			} else {
				srv.Spec.Rotation = state.Spec.Rotation
			}
			srv.SetTTL(process, defaults.ServerAnnounceTTL)
			return &srv, nil
		},
		KeepAlivePeriod: defaults.ServerKeepAliveTTL,
		AnnouncePeriod:  defaults.ServerAnnounceTTL/2 + utils.RandomDuration(defaults.ServerAnnounceTTL/10),
		CheckPeriod:     defaults.HeartbeatCheckPeriod,
		ServerTTL:       defaults.ServerAnnounceTTL,
	})
	if err != nil {
		return trace.Wrap(err)
	}
}
