import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import SideNav, { SideNavItem } from '../SideNav'

storiesOf('SideNav', module)
  .add(
    'SideNav component',
    withInfo({
      inline: true,
      text:
        'Use the <SideNav /> to render the top nav component for an application. Make sure to include the properties you desire.'
    })(() => {
      return (
        <SideNav>
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
    })
  );