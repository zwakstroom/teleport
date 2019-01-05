import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TopNavItem from '../TopNavItem';
import Menu from '../../Menu/Menu';
import defaultAvatar from './avatar.png';

class TopNavUserMenu extends React.Component {

  static displayName = 'TopNavMenu';

  static defaultProps = {
    avatar: defaultAvatar,
    open: false
  }

  static propTypes = {
    /** Callback fired when the component requests to be closed. */
    onClose: PropTypes.func,
    /** Callback fired when the component requests to be open. */
    onShow: PropTypes.func,
    /** If true the menu is visible */
    open: PropTypes.bool,
  }

  setRef = e => {
    this.btnRef = e;
  }

  render() {
    const {
      user,
      onClose,
      onShow,
      open,
      avatar,
      anchorOrigin,
      transformOrigin,
      children
    } = this.props;

    const anchorEl = open ? this.btnRef : null;
    return (
      <TopNavItem style={{ marginLeft: "auto" }}>
        <AvatarButton ref={this.setRef} onClick={onShow}>
          <em>{user}</em>
          <img src={avatar} />
        </AvatarButton>
        <Menu
          menuListCss={menuListCss}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          { children }
        </Menu>
      </TopNavItem>
    );
  }
}

export default TopNavUserMenu;

const AvatarButton = styled.div`
  img {
    display: inline-block;
    float: right;
    height: 24px;
    margin: 24px 8px 24px 16px;
  }

  em {
    font-size: 10px;
    font-weight: bold
    font-style: normal;
    margin: 0;
  }
`;

/** Custom css styles for MenuList */
const menuListCss = () => `

`