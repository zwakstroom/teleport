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
import cfg from 'app/config';
import * as actions from 'app/flux/user/actions';
import { getters } from 'app/flux/user';
import { withDocTitle } from './../DocumentTitle';
import InviteForm from './InviteForm';
import ExpiredInvite from './InviteForm/ExpiredInvite';
import Logo from 'shared/components/Logo';
import logoSvg from 'shared/assets/images/teleport-medallion.svg';

export class Invite extends React.Component {

  componentDidMount() {
    this.props.fetchInvite(this.props.inviteToken);
  }

  onSubmitWithU2f = (username, password) => {
    this.props.acceptInviteWithU2f(username, password, this.props.inviteToken);
  }

  onSubmit = (username, password, token) => {
    this.props.acceptInvite(username, password, token, this.props.inviteToken);
  }

  render() {
    const { fetchingInvite, invite, attempt } = this.props;
    const auth2faType = cfg.getAuth2faType();

    if(fetchingInvite.isFailed){
      return (
        <div>
          <Logo src={logoSvg}/>
          <ExpiredInvite />
        </div>
      );
    }

    if(!invite) {
      return null;
    }

    return (
      <div>
        <Logo src={logoSvg}/>
        <InviteForm
          auth2faType={auth2faType}
          attempt={attempt}
          invite={invite}
          onSubmitWithU2f={this.onSubmitWithU2f}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    invite: getters.invite,
    attempt: getters.attemp,
    fetchingInvite: getters.fetchingInvite
  }
}

function mapActionsToProps(props) {
  return {
    fetchInvite: actions.fetchInvite,
    acceptInviteWithU2f: actions.acceptInviteWithU2f,
    acceptInvite: actions.acceptInvite,
    inviteToken: props.match.params.inviteToken,
  }
}

export default withDocTitle("Invite",
  connect(mapStateToProps, mapActionsToProps)(Invite)
);
