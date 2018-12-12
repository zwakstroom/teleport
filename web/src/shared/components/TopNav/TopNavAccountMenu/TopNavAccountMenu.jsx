import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TopNavButton from '../TopNavButton';
import {DropdownMenu, DropdownItem, DropdownOverlay} from '../../DropDown/';
import Button from '../../Button';
import avatar from './avatar.png';
import {z} from '../../theme';

const AccountMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${z[1]};
`;

const AvatarButton = styled(TopNavButton)`
  img {
    display: inline-block;
    float: left;
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

// This could be react-router-dom's Link for example
export class TopNavAccountMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
    };
  }

  toggleMenu = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  signOut = () => {
    this.toggleMenu();
    alert('sign out!');
  }

  render() {
    const { hidden } = this.state;
    return (
      <AccountMenu>
        <AvatarButton onClick={this.toggleMenu}>
          <em>username</em>
          <img src={avatar} />
        </AvatarButton>

        <DropdownMenu location="topRight" hidden={hidden}>
          <DropdownItem onClick={this.toggleMenu}>
            Account Info
          </DropdownItem>
          <DropdownItem onClick={this.toggleMenu}>Change Password</DropdownItem>

          <Button mt={2} block onClick={this.signOut}>Sign Out</Button>
        </DropdownMenu>

        <DropdownOverlay hidden={hidden} onClick={this.toggleMenu}/>
      </AccountMenu>
    );
  }
}



TopNavAccountMenu.propTypes = {
  product: PropTypes.string,
  version: PropTypes.string,
};

TopNavAccountMenu.defaultProps = {
  product: 'Product Name',
  href: 'v#'
}

TopNavAccountMenu.displayName = 'TopNavAccountMenu';


export default TopNavAccountMenu;