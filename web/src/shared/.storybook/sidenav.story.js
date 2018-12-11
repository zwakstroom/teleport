import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import SideNav from '../SideNav'

storiesOf('SideNav', module)
  .add(
    'SideNav component',
    withInfo({
      inline: true,
      text:
        'Use the <SideNav /> to render the top nav component for an application. Make sure to include the properties you desire.'
    })(() => {
      return (
        <SideNav
          buttons={[
            {active: true, label: 'Clusters',location: '/'},
            {label: 'Apps',location: '/apps'},
            {label: 'Users/Roles',location: '/users'},
            {label: 'Licenses',location: '/licenses'},
            {label: 'Setttings',location: '/settings'},
          ]}
        />
      );
    })
  );