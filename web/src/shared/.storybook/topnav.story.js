import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import TopNav from '../TopNav'

storiesOf('TopNav', module)
  .add(
    'TopNav component',
    withInfo({
      inline: true,
      text:
        'Use the <TopNav /> to render the top nav component for an application. Make sure to include the properties you desire.'
    })(() => {
      return (
        <TopNav
          product="gravity"
          version="5.3.2"
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
  // .add('color', () => (
  //   <div>
  //     <Button mr={2}>Button</Button>
  //     <GreenButton mr={2}>GreenButton</GreenButton>
  //   </div>
  // ))
  // .add('sizes', () => (
  //   <div>
  //     <Button size="large" mr={2}>
  //       Large
  //     </Button>
  //     <Button size="medium" mr={2}>
  //       Medium
  //     </Button>
  //     <Button size="small" mr={2}>
  //       Small
  //     </Button>
  //   </div>
  // ))
  // .add('fullWidth', () => <Button fullWidth>Full Width</Button>)
  // .add('disabled', () => <Button disabled>Disabled</Button>)