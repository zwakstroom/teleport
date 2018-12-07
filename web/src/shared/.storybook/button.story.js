import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Button from '../Button'

storiesOf('Button', module)
  .add(
    'Button component',
    withInfo({
      inline: true,
      text:
        'Use the <Button /> component to render a primitive button.'
    })(() => <Button size="large">Click Me</Button>)
  )
  .add('color', () => (
    <div>
      <Button mr={2}>Primary</Button>
      <Button secondary>Secondary</Button>
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Button size="large" mr={2}>Large</Button>
      <Button size="medium" mr={2}>Medium</Button>
      <Button size="small" mr={2}>Small</Button>
    </div>
  ))
  .add('block', () => <Button block>Block Button</Button>)
  .add('disabled', () => <Button disabled>Disabled</Button>)