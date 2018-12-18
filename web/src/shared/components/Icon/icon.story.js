import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components'
import * as Icon from '../Icon';

storiesOf('Icon', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('Icon components', () => (
    <Container>
      <Icon.Github />
      <Icon.Microsoft />
      <Icon.Google />
    </Container>
  ));

const Container = styled.div`
  font-size: 34px;
  .icon {
    margin: 20px 20px 10px 10px;
  }
`