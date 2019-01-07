import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import SideNav, { SideNavItem } from '../SideNav'
import LogoButton from '../LogoButton'
import teleportLogo from 'shared/assets/images/teleport-logo.svg';
import cfg from 'app/config';

storiesOf('SideNav', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false,
    },
  })
  .add('SideNav component', () => {
    return (
      <SideNav static>
        <LogoButton src={teleportLogo} version="3.2.1" href={cfg.routes.app} />
        <SideNavItem>
          Item 1
          </SideNavItem>
        <SideNavItem>
          Item 2
          </SideNavItem>
        <SideNavItem>
          Item 3
          </SideNavItem>
      </SideNav>
    );
  });
