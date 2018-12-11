import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Indicator from '../Indicator'

const description = 'Use <Indicator> component to render a loding indicator'

storiesOf('Indicator', module)
  .add(
    'Indicator component',
    withInfo({
      inline: true,
      text: description
    })(() => <Indicator />)
  )