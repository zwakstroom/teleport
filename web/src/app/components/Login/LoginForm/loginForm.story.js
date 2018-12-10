import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginForm from './LoginForm';
import "font-awesome/css/font-awesome.css";
import { AuthProviderTypeEnum } from 'app/services/enums';

const defaultProps = {
  attempt: {
    isFailed: false
  },
  cb() { }
}

storiesOf('LoginForm', module)
  .add('with user name and password', () => {
    return (
      <LoginForm
        authProviders={[]}
        auth2faType="otp"
        onLoginWithSso={defaultProps.cb}
        onLoginWithU2f={defaultProps.cb}
        onLogin={defaultProps.cb}
        attempt={defaultProps.attempt}
      />);
  })
  .add('with server errors', () => {
    const attempt = {
      ...defaultProps.attempt,
      isFailed: true,
      message: 'invalid credentials with looooooooooooooooooooooooooooooooooooooong text'
    }

    return (
      <LoginForm
        authProviders={[]}
        auth2faType="off"
        onLoginWithSso={defaultProps.cb}
        onLoginWithU2f={defaultProps.cb}
        onLogin={defaultProps.cb}
        attempt={attempt}
      />);
  })
  .add('with social', () => {
    const ssoProvider = [
      { name: 'github', type: AuthProviderTypeEnum.OIDC, url: "" },
      { name: 'google', type: AuthProviderTypeEnum.OIDC, url: "" },
      { name: 'bitbucket', type: AuthProviderTypeEnum.OIDC, url: "" },
      { name: 'unknown', type: AuthProviderTypeEnum.OIDC, url: "" },
      { name: 'microsoft', type: AuthProviderTypeEnum.OIDC, url: "" }
    ];

    return (
      <LoginForm
        authProviders={ssoProvider}
        auth2faType="off"
        onLoginWithSso={defaultProps.cb}
        onLoginWithU2f={defaultProps.cb}
        onLogin={defaultProps.cb}
        attempt={defaultProps.attempt}
      />);
  })
  .add('with U2F USB KEY', () => {
    const attempt = {
      ...defaultProps.attempt,
      isProcessing: true,
    }

    return (
      <LoginForm
        authProviders={[]}
        auth2faType="u2f"
        onLoginWithSso={defaultProps.cb}
        onLoginWithU2f={defaultProps.cb}
        onLogin={defaultProps.cb}
        attempt={attempt}
      />);
  })

