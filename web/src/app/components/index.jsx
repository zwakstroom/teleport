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
import { connect } from './nuclear';
import appGetters from 'app/flux/app/getters';
import { Failed } from './msgPage.jsx';
import { initApp } from 'app/flux/app/actions';
import { TopNav, Indicator } from 'app/../shared/components';
import withAuth from './withAuth';
import FeatureActivator from './../featureActivator';

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

    if (isSuccess) {
      return (
        <div>
          <TopNav
            product="gravity"
            version="5.3.2"
            buttons={[
              {active: true, label: 'Clusters',location: '/'},
            ]}
          />
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps() {
  return {
    initAttempt: appGetters.initAttempt
  }
}

export default withAuth(connect(mapStateToProps)(App))