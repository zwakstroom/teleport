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
import { Box } from 'shared/components';
import cfg from 'app/config';
import { getters } from 'app/flux/user';
import { withDocTitle } from './../DocumentTitle';
import * as actions from 'app/flux/settingsAccount/actions';
import PasswordForm from './PasswordForm';

import AppBar from './../AppBar/AppBar';
import AppLogo from './../AppLogo';
import Header from 'app/components/Header';

export class Settings extends React.Component {

  render() {
    const {
      auth2faType,
      onChangePass,
      onChangePassWithU2f,
      onDestory,
      attempt } = this.props;

    return (
      <React.Fragment>
        <AppBar >
          <AppLogo/>
        </AppBar>

        <Box mx={4} mb={3} mt="1">
          <Header title="Account Settings" />
        </Box>
        <Box mx={4}>
          <PasswordForm
            auth2faType={auth2faType}
            onChangePass={onChangePass}
            onChangePassWithU2f={onChangePassWithU2f}
            onDestory={onDestory}
            attempt={attempt}
          />
        </Box>
      </React.Fragment>
    );
  }
}

function mapStoreToProps() {
  return {
    attempt: getters.pswChangeAttempt
  }
}

function mapActionsToProps() {
  return {
    auth2faType: cfg.getAuth2faType(),
    onChangePass: actions.changePassword,
    onChangePassWithU2f: actions.changePasswordWithU2f,
    onDestory: actions.resetPasswordChangeAttempt
  }
}

export default withDocTitle("Settings",
  connect(mapStoreToProps, mapActionsToProps)(Settings)
);
