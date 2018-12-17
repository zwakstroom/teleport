import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import TopNav from './TopNav'
import TopNavItem from './TopNavItem'
import TopNavMenu from './TopNavMenu'
import MenuItem from './../Menu/MenuItem';
import teleportSvg from './../../assets/images/teleport-logo.svg';

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
          logoSrc={teleportSvg}
          version="5.3.2">
          <TopNavItem>
            Action 1
          </TopNavItem>
          <TopNavItem>
            Action 2
          </TopNavItem>
          <AppMenu/>
        </TopNav>
      );
    })
  );

  class AppMenu extends React.Component {

    state = {
      open: false,
    };

    onShow = () => {
      this.setState({ open: true });
    };

    onClose = () => {
      this.setState({ open: false });
    };

    onItemClick = () => {
      this.onClose();
    }

    render() {
      return (
        <TopNavMenu
          open={this.state.open}
          onShow={this.onShow}
          onClose={this.onClose}
          user="example@example.com" >
          <MenuItem onClick={this.onItemClick}>
            Test
          </MenuItem>
          <MenuItem onClick={this.onItemClick}>
              Test2
          </MenuItem>
        </TopNavMenu>
      )
    }
  }