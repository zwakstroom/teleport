import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Button from '../Button'

storiesOf('Button', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    },
  })
  .add('Button component', () => (
    <Button size="large">Click Me</Button>
  )
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
  .add('states', () => (
    <div>
      <Button mr={2} disabled>Disabled</Button>
      <Button autoFocus> Focused</Button>
    </div>
  ));