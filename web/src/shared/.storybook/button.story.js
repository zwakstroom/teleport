import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Button, { GreenButton } from '../Button'

storiesOf('Button', module)
  .add(
    'Button component!!',
    withInfo({
      inline: true,
      text:
        'Use the <Button />,  <GreenButton />, components to render a primitive button.'
    })(() => <Button size="large">Button</Button>)
  )
  .add('color', () => (
    <div>
      <Button mr={2}>Button</Button>
      <GreenButton mr={2}>GreenButton</GreenButton>
    </div>
  ))
  .add('sizes', () => (
    <div>
      <Button size="large" mr={2}>
        Large
      </Button>
      <Button size="medium" mr={2}>
        Medium
      </Button>
      <Button size="small" mr={2}>
        Small
      </Button>
    </div>
  ))
  .add('fullWidth', () => <Button fullWidth>Full Width</Button>)
  .add('disabled', () => <Button disabled>Disabled</Button>)