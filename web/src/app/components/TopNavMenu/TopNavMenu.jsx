import React from 'react'
import { connect } from './../nuclear';
import { getters } from 'app/flux/user';
import { logout } from 'app/flux/user/actions';
import TopNavUserMenu from 'shared/components/TopNav/TopNavUserMenu'
import MenuItem from 'shared/components/Menu/MenuItem';
import Button from 'shared/components/Button';

export class AppMenu extends React.Component {

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

  onLogout = () => {
    this.props.onLogout();
    this.onClose();
  }

  render() {
    const { username } = this.props;
    return (
      <TopNavUserMenu
        open={this.state.open}
        onShow={this.onShow}
        onClose={this.onClose}
        user={username} >
        <MenuItem onClick={this.onLogout}>
          <Button size="sm">
            Logout
          </Button>
        </MenuItem>
      </TopNavUserMenu>
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

export default connect(mapStoreToProps, mapActionsToProps)(AppMenu);
