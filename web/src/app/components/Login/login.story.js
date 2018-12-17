import React from 'react';
import { storiesOf } from '@storybook/react';
import { Login } from './Login';
import "font-awesome/css/font-awesome.css";

storiesOf('Teleport/Login', module)
  .add('basic rendering', () => {
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
