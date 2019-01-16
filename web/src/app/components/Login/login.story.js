import React from 'react';
import { storiesOf } from '@storybook/react';
import { Login } from './Login';

storiesOf('Teleport/Login', module)
  .add('Login', () => {
    const props = {
      authType: '',
      attempt:{},
      auth2faType: "off"
    }

    return (
      <Login
        {...props}
      />);
  });
