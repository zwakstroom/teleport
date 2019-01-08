import React from 'react'
import { storiesOf } from '@storybook/react'
import PasswordForm from './PasswordForm'
import { Auth2faTypeEnum } from 'app/services//enums';

const onChangePass = () => null;
const onChangePassWithU2f = () => null;
const onDestory = () => null;

storiesOf('Teleport/Settings/PasswordForm', module)
  .add('PasswordForm', () => {
    return (
      <PasswordForm
        auth2faType
        onChangePass={onChangePass}
        onChangePassWithU2f={onChangePassWithU2f}
        onDestory={onDestory}
        attempt={{}}
      />
    );
  })
  .add('With OTP', () => {
    return (
      <PasswordForm
        auth2faType={ Auth2faTypeEnum.OTP }
        onChangePass={onChangePass}
        onChangePassWithU2f={onChangePassWithU2f}
        onDestory={onDestory}
        attempt={{}}
      />
    );
  })
  .add('With U2F', () => {
    return (
      <PasswordForm
        auth2faType={ Auth2faTypeEnum.UTF }
        onChangePass={onChangePass}
        onChangePassWithU2f={onChangePassWithU2f}
        onDestory={onDestory}
        attempt={{ isProcessing: true}}
      />
    );
  })
  .add('Processing', () => {
    return (
      <PasswordForm
        auth2faType
        onChangePass={onChangePass}
        onChangePassWithU2f={onChangePassWithU2f}
        onDestory={onDestory}
        attempt={{ isProcessing: true}}
      />
    );
  })
  .add('Error', () => {
    return (
      <PasswordForm
        auth2faType
        onChangePass={onChangePass}
        onChangePassWithU2f={onChangePassWithU2f}
        onDestory={onDestory}
        attempt={{ isFailed: true, message: "Server Error (some long text)"}}
      />
    );
  })