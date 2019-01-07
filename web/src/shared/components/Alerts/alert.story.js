import React from 'react'
import { storiesOf } from '@storybook/react'
import Alert from './index'

storiesOf('Alert', module)
  .add('Danger Alert', () => {
    return (
      <Alert status="danger">This is an error!</Alert>
    );
  })
  .add('Warning Alert', () => {
    return (
      <Alert status="warning">This is an error!</Alert>
    );
  })
  .add('Info Alert', () => {
    return (
      <Alert status="info">This is an error!</Alert>
    );
  })
  .add('Success Alert', () => {
    return (
      <Alert status="success">This is an error!</Alert>
    );
  });
