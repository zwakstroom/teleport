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

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components';
import { connect } from './../nuclear';
import { getters } from 'app/flux/app/appStore';
import { Failed } from './../Errors';
import { initApp } from 'app/flux/app/actions';
import { Indicator } from 'shared/components';
import withAuth from './../withAuth';
import FeatureActivator from './../../featureActivator';
import Clusters from './../Clusters';
import Cluster from './../Cluster';
import cfg from 'app/config';

class App extends Component {

  componentDidMount() {
    const featureActivator = new FeatureActivator();
    initApp("", featureActivator);
  }

  render() {
    const { initAttempt } = this.props;
    const { isProcessing, isSuccess, isFailed, message } = initAttempt;

    if (isProcessing) {
      return <Indicator />
    }

    if (isFailed) {
      return <Failed message={message}/>
    }

    if (!isSuccess) {
      return null;
    }

    return (
      <StyledApp>
        <Switch>
          <Route exact path={cfg.routes.app} component={Clusters} />
          <Route path={cfg.routes.cluster}
            render={ ({match}) => (
              <Cluster path={match.path} clusterId={match.params.clusterId} />
            )}
          />
        </Switch>
      </StyledApp>
    );
  }
}

function mapStateToProps() {
  return {
    initAttempt: getters.initAttempt
  }
}

export default withAuth(connect(mapStateToProps)(App));

const StyledApp = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
`