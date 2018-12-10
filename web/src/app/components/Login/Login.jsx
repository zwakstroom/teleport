/*
Copyright 2018 Gravitational, Inc.

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
import actions from 'app/flux/user/actions';
import { getters } from 'app/flux/user';
import cfg from 'app/config';
import { TeleportLogo } from './../Images';
import LoginForm from './LoginForm/';
import { withDocTitle } from './../documentTitle';

export class Login extends React.Component {

  onLoginWithSso = ssoProvider => {
    actions.loginWithSso(ssoProvider.name, ssoProvider.url);
  }

  onLoginWithU2f = (username, password) => {
    actions.loginWithU2f(username, password);
  }

  onLogin = (username, password, token) => {
    actions.login(username, password, token);
  }

  render() {
    const { attempt } = this.props;
    const authProviders = cfg.getAuthProviders();
    const auth2faType = cfg.getAuth2faType();

    return (
      <div>
        <TeleportLogo/>
        <LoginForm
          authProviders={authProviders}
          auth2faType={auth2faType}
          onLoginWithSso={this.onLoginWithSso}
          onLoginWithU2f={this.onLoginWithU2f}
          onLogin={this.onLogin}
          attempt={attempt}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    attempt: getters.loginAttemp
  }
}

export default withDocTitle("Login", connect(mapStateToProps)(Login));
