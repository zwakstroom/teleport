import React from 'react';
import { storiesOf } from '@storybook/react';
import { Invite } from './Invite';

storiesOf('Teleport/Invite', module)
  .add('Invite', () => {
    const props = {
      ...defaultProps,
      auth2faType: "off"
    }

    return (
      <Invite
        {...props}
      />);
  })
  .add('Expired Invite', () => {
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