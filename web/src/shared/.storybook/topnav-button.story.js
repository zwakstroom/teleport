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
        'Use the <TopNavButton />, to render a button design for the top navigation.'
    })
    (() => (
      <nav>
        <TopNavButton active href="/">Active</TopNavButton>
        <TopNavButton href="#">Inactive</TopNavButton>
      </nav>
    ))
  );
