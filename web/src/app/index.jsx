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
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom'
import { Provider } from './components/nuclear';
import Login from './components/Login';
import Invite from './components/Invite';
import cfg from './config';
import App from './components/App';
import ThemeProvider from './../shared/components/ThemeProvider';
import { hot, setConfig } from 'react-hot-loader'
import AppError from './components/AppError';
import LoginSuccessful from './components/LoginSuccessful';

setConfig({
  logLevel: 'no-errors-please'
});

const Root = props => (
  <Router history={props.history}>
    <Provider reactor={props.reactor}>
      <ThemeProvider>
        <Switch>
          <Route path={cfg.routes.error} component={AppError} />
          <Route path={cfg.routes.successfulLogin} component={LoginSuccessful }/>
          <Route path={cfg.routes.login} component={Login} />
          <Route path={cfg.routes.newUser} component={Invite} />
          <Route path={cfg.routes.app} component={App} />
        </Switch>
      </ThemeProvider>
      </Provider>
  </Router>
)

export default hot(module)(Root);
