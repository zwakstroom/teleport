import React from 'react'
import { connect } from './../../nuclear';
import { getters } from 'app/flux/user';
import cfg from 'app/config';
import { logout } from 'app/flux/user/actions';
import TopNavUserMenu from 'shared/components/TopNav/TopNavUserMenu'
import { TopNav, TopNavItemLink } from 'shared/components';
import teleportLogoSvg from 'app/../shared/assets/images/teleport-logo.svg';
import MenuItem from 'shared/components/Menu/MenuItem';
import Button from 'shared/components/Button';

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
    const { username } = this.props;
    return (
      <TopNav logoSrc={teleportLogoSvg} version="v3.2.0-alpha.1">
        <TopNavItemLink to={cfg.routes.app} >
          Clusters
        </TopNavItemLink>
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
