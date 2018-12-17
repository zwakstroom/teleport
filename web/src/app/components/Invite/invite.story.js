import React from 'react';
import { storiesOf } from '@storybook/react';
import { Invite } from './Invite';
import "font-awesome/css/font-awesome.css";

storiesOf('Teleport/Invite', module)
  .add('basic rendering', () => {
    const props = {
      ...defaultProps,
      auth2faType: "off"
    }

    return (
      <Invite
        {...props}
      />);
  })
  .add('with expired invite', () => {
    const props = {
      ...defaultProps,
      auth2faType: "off",
      fetchingInvite: {
        isFailed: true,
        message: "Server side error"
      },
    }

    return (
      <Invite
        {...props}
      />);
  });


const invite = {
  "invite_token": "c0de46ef150998597760a679230409a8",
  "user": "test@gravitational.com",
};

const defaultProps = {
  params: {
    inviteToken: 'xx',
  },
  auth2faType: 'otp',
  authType: '',


  invite: invite,
  attempt:{},
  fetchingInvite: {},
  submitWithU2f: () => {},
  fetchInvite: () => {},
  acceptInviteWithU2f: () => {},
  acceptInvite: () => {},
}