import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Input from '../Input';

storiesOf('Input', module)
  .add(
    'Input Field',
    withInfo({
      inline: true,
      text: 'Use the <Input /> component to render a form input field.'
    })(() => {
      return <Input placeholder="Enter Some Text" defaultValue="This is a form field" />;
    })
  )
  .add('error', () => {
    return <Input hasError="blah" defaultValue="This field has an error" />;
  });