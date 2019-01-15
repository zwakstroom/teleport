import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import cfg from 'app/config';
import { connect } from './../nuclear';
import { getters } from 'app/flux/user';
import { logout } from 'app/flux/user/actions';
import TopNavUserMenu from 'shared/components/TopNav/TopNavUserMenu'
import { TopNav, Text } from 'shared/components';
import MenuItem from 'shared/components/Menu/MenuItem';
import Button from 'shared/components/Button';
import * as Icon from 'shared/components/Icon';

export class AppBar extends React.Component {

  state = {
    open: false,
  };

  onShowMenu = () => {
    this.setState({ open: true });
  };

  onCloseMenu = () => {
    this.setState({ open: false });
  };

  onItemClick = () => {
    this.onClose();
  }

  onLogout = () => {
    this.props.onLogout();
    this.onClose();
  }

  render() {
    const { username, children } = this.props;
    return (
      <TopNav>
        {children}
        <TopNavUserMenu
          menuListCss={menuListCss}
          open={this.state.open}
          onShow={this.onShowMenu}
          onClose={this.onCloseMenu}
          user={username} >

          <MenuItem as={props => <NavLink {...props} to={cfg.routes.settingsAccount}/> }>
            <Icon.Profile fontSize={4} mr={1} color="text" />
            <Text fontSize={1}>Account Settings</Text>
          </MenuItem>

          <LogoutMenuItem onClick={this.onLogout}>
            <Button block>Sign Out</Button>
          </LogoutMenuItem>
        </TopNavUserMenu>
      </TopNav>
    )
  }
}


function mapStoreToProps() {
  return {
    username: getters.userName
  }
}

function mapActionsToProps() {
  return {
    onLogout: logout
  }
}

const menuListCss = () => `
  width: 250px;
`

const LogoutMenuItem = styled.div`
  margin: 32px 0 0 0;
  padding: 16px;
`

export default connect(mapStoreToProps, mapActionsToProps)(AppBar);
