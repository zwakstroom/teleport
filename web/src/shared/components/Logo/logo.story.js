import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Logo from '../Logo'
import teleportSvg from './../../assets/images/gravity-medallion.svg';

storiesOf('Logo', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add('Logo component', () => <Logo src={teleportSvg} />);
