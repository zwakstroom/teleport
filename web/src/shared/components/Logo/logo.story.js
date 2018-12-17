import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Logo from '../Logo'

storiesOf('Logo', module)
  .add(
    'Logo component',
    withInfo({
      inline: true,
      text:
        'Use the <Logo /> component to render a Logo.'
    })(() => <Logo product="teleport"/>)
  )
  .add('products', () => (
    <div>
      <Logo product="teleport"/>
      <Logo product="gravity"/>
    </div>
  ));
