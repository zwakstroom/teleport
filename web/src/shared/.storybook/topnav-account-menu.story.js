import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import TopNavAccountMenu from '../TopNav/TopNavAccountMenu'

storiesOf('TopNavAccountMenu', module)
  .add(
    'TopNavAccountMenu component',
    withInfo({
      inline: true,
      text:
        'Use the <TopNavAccountMenu />, to render a button design for the top navigation.'
    })
    (() => (
      <nav style={{position: 'relative', height: '70px'}}>
        <TopNavAccountMenu />
      </nav>
    ))
  );
