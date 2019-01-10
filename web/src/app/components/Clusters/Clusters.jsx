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
import { connect } from './../nuclear';
import AppBar from './../AppBar/AppBar';
import AppLogo from './../AppLogo';
import siteGetters from 'app/flux/sites/getters';
import { Flex, Box } from 'shared/components';
import CardCluster from './CardCluster';
import { showCluster } from 'app/flux/sites/actions';
import Header from 'app/components/Header';

export class Clusters extends React.Component {

  onSelectCluster = clusterId => {
    this.props.onSelectCluster(clusterId);
  }

  render() {
    const { clusters } = this.props;
    const $clusters = clusters.map((cluster, index) => {
      const { name, nodeCount, connectedAt, status } = cluster;
      const key = `${name}-${index}`;
      return (
        <CardCluster
          m={2}
          key={key}
          onClick={this.onSelectCluster}
          nodeCount={nodeCount}
          name={name}
          connectedAt={connectedAt}
          status={status}
        />
      )
    })

    return (
      <Flex flexDirection="column" height="100%">
        <div>
          <AppBar >
            <AppLogo/>
          </AppBar>
        </div>
        <div style={{ overflow: "auto" }}>
          <Box mx={2} my={3}>
            <Header title="Clusters" />
          </Box>
          <Flex flexWrap="wrap" >
            {$clusters}
          </Flex>
        </div>
      </Flex>
    );
  }
}

function mapStoreToProps() {
  return {
    clusters: siteGetters.sites,
  }
}

function mapActionsToProps() {
  return {
    onSelectCluster: showCluster
  }
}

export default connect(mapStoreToProps, mapActionsToProps)(Clusters);