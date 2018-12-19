import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Input from '../Input';

storiesOf('Input', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false,
      text: 'Use the <Input /> component to render a form input field.'
    },
  })
  .add('empty', () => {
    return <Input placeholder="Enter Some Text" />;
  })
  .add('error', () => {
    return <Input hasError="blah" defaultValue="This field has an error" />;
  })
  .add('focused', () => {
    return <Input autoFocus defaultValue="This field has an focus" />;
  });