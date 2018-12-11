import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from './../theme';
import SideNavButton from './SideNavButton';

const Nav = styled.nav`
  background: ${theme.background.primary};
  left: 0;
  position: fixed;
  bottom: 0;
  top: 0;
  width: 240px;
  z-index: ${theme.z.max1};
`;

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  renderButtons() {
    const {buttons} = this.props;
    let navButtons = null;

    if(buttons && buttons.length) {
      navButtons = buttons.map((button, index) => {
        const isActive = button.active ? true : false;

        if(isActive) {
          return <SideNavButton key={index} active href={button.location}>{button.label}</SideNavButton>;
        }
        else {
          return <SideNavButton key={index} href={button.location}>{button.label}</SideNavButton>;
        }
      });
    }

    return navButtons;
  }

  render() {
    return (
      <Nav>
        {this.renderButtons()}

      </Nav>
    );
  }
}

SideNav.propTypes = {
  /** {label: "Button Name", location: "http://google.com"} */
  buttons: PropTypes.array,
};


export default SideNav;