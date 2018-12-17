import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components'
import * as Icon from '../Icon';

storiesOf('Icon', module)
  .add('Icon components', () => {
    return
  })

  .add(
    'Icon components',
    withInfo({
      inline: true,
    })(() => (
      <Container>
        <Icon.Github />
        <Icon.Microsoft />
        <Icon.Google />
      </Container>
    ))
)

const Container = styled.div`
  font-size: 34px;

  .icon {
    margin: 20px 20px 10px 10px;
  }
`