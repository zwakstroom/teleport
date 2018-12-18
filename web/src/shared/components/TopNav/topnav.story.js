import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import TopNav from './TopNav';
import TopNavItem from './TopNavItem';
import TopNavUserMenu from './TopNavUserMenu';
import MenuItem from './../Menu/MenuItem';
import teleportSvg from './../../assets/images/teleport-logo.svg';

storiesOf('TopNav', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      text:
        'Use the <TopNav /> to render the top nav component'
    },
  })
  .add('TopNav component', () => {
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
        <MenuExample />
      </TopNav>
    );
  });

class MenuExample extends React.Component {

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
      <TopNavUserMenu
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
      </TopNavUserMenu>
    )
  }
}