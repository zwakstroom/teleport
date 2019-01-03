import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import SideNav, { SideNavItem } from '../SideNav'

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
