/*
Copyright 2015 Gravitational, Inc.

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

import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom'
import { connect } from './../nuclear';
import cfg from 'app/config';
import clusterGetters from 'app/flux/sites/getters';
import { Flex, Box, SideNav, SideNavItem } from 'shared/components';
import ClusterNodes from './../ClusterNodes';
import ClusterSelector from './ClusterSelector';
import { changeCluster } from 'app/flux/sites/actions';

export class Cluster extends React.Component {

  onChangeCluster = option => {
    this.props.onChangeCluster(option.value)
  }

  render() {
    const { clusterId, clusters } = this.props;
    const clusterOptions = clusters.map(c => ({
      value: c.name,
      label: c.name
    }));

    return (
      <Flex style={{ height: "100%" }}>
        <Box style={{ overflow: "auto" }}>
          <SideNav>
            <SideNavItem as={props => (
              <NavLink className={props.className}
                exact
                to={cfg.getClusterUrl(clusterId)}>
                  Nodes
              </NavLink>
              )}
            />
            <SideNavItem as={props => (
              <NavLink className={props.className}
                to={cfg.getClusterSessionsUrl(clusterId)}>
                Sessions
              </NavLink>
              )}
            />
          </SideNav>
        </Box>
        <Box m={4} style={{ overflow: "auto" }} >
          <div style={{width: "400px"}}>
            <ClusterSelector
              value={clusterId}
              onChange={this.onChangeCluster}
              options={clusterOptions}
            />
          </div>
          <Switch>
            <Route exact path={cfg.routes.cluster} >
              <ClusterNodes clusterId={clusterId} />
            </Route>
          </Switch>
        </Box>
      </Flex>
    );
  }
}

function mapStoreToProps() {
  return {
    clusters: clusterGetters.sites
  }
}

function mapStateToProps() {
  return {
    onChangeCluster: changeCluster,
  }
}

export default connect(mapStoreToProps, mapStateToProps)(Cluster);



