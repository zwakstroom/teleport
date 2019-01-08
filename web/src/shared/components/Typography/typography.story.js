import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Typography from '../Typography'

storiesOf('Typography', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false,
    },
  })
  .add('Typography component', () => (
      <Typography.h1>Typography h1</Typography.h1>
  ))
  .add('Using dot-notation with h1-h6', () => (
    <section>
      <Typography.h1>Typography h1</Typography.h1>
      <Typography.h2>Typography h2</Typography.h2>
      <Typography.h3>Typography h3</Typography.h3>
      <Typography.h4>Typography h4</Typography.h4>
      <Typography.h5>Typography h5</Typography.h5>
      <Typography.p>Typography p</Typography.p>
    </section>
  ))
  .add('Using <Text> props', () => (
    <section>
      <Typography.h1 textAlign="left" bold fontSize={6} color="green">
        Typography.h1 Left
      </Typography.h1>
      <Typography.h1 textAlign="center" medium fontSize={5} color="blue">
        Typography.h1 Center
      </Typography.h1>
      <Typography.h1 textAlign="right" regular fontSize={4} color="orange">
        Typography.h1 Right
      </Typography.h1>
    </section>
  ));