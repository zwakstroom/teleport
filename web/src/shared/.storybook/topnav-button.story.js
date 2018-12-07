import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import TopNavButton from '../TopNav/TopNavButton'

storiesOf('TopNavButton', module)
  .add(
    'TopNavButton component',
    withInfo({
      inline: true,
      text:
        'Use the <Button />,  <GreenButton />, components to render a primitive button.'
    })
    (() => (
      <nav>
        <TopNavButton active href="/">Active</TopNavButton>
        <TopNavButton href="#">Inactive</TopNavButton>
      </nav>
    ))
  );
