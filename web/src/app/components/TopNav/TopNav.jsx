import React from 'react'
import { connect } from './../nuclear';
import { getters } from 'app/flux/user';
import { logout } from 'app/flux/user/actions';
import TopNavUserMenu from 'shared/components/TopNav/TopNavUserMenu'
import { TopNav } from 'shared/components';
import NavLogo from './../NavLogo';
import MenuItem from 'shared/components/Menu/MenuItem';
import Button from 'shared/components/Button';
import teleportLogoSvg from 'app/../shared/assets/images/teleport-logo.svg';

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
    const { username, withLogo, children } = this.props;
    return (
      <TopNav>
        {withLogo && <NavLogo src={teleportLogoSvg} />}
        {children}
        <TopNavUserMenu
          open={this.state.open}
          onShow={this.onShowMenu}
          onClose={this.onCloseMenu}
          user={username} >
          <MenuItem onClick={this.onLogout}>
            <Button size="small">
              Logout
            </Button>
          </MenuItem>
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

export default connect(mapStoreToProps, mapActionsToProps)(AppBar);
