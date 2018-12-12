import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import TopNavLogo from '../TopNav/TopNavLogo/TopNavLogo'

storiesOf('TopNavLogo', module)
  .add(
    'TopNavLogo component',
    withInfo({
      inline: true,
      text:
        'Use the <TopNavLogo /> to render a button logo.'
    })(() => {
      return (<TopNavLogo product="teleport" version="3.2.1" />);
    })
  );