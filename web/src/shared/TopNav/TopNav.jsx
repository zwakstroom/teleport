import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from './../theme';
import TopNavButton from './TopNavButton';
import TopNavLogo from './TopNavLogo/TopNavLogo';
import TopNavAccountMenu from './TopNavAccountMenu/TopNavAccountMenu';

const Nav = styled.nav`
  background: ${props => props.theme.background.secondary};
  box-shadow: 0 8px 24px rgba(0, 0, 0, .24);
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${theme.z.max2};
`;

class TopNav extends React.Component {
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
          return <TopNavButton key={index} active href={button.location}>{button.label}</TopNavButton>;
        }
        else {
          return <TopNavButton key={index} href={button.location}>{button.label}</TopNavButton>;
        }
      });
    }

    return navButtons;
  }

  render() {
    return (
      <Nav>
        <TopNavLogo product={this.props.product} version={this.props.version} />
        {this.renderButtons()}

        <TopNavAccountMenu cta={{location: '', label: 'Logout'}} />
      </Nav>
    );
  }
}

TopNav.propTypes = {
  /** {label: "Button Name", location: "http://google.com"} */
  buttons: PropTypes.array,
  /** The name of the product (gravity, teleport) */
  product: PropTypes.oneOf(['gravity', 'teleport']),
  /** The version of the product (ex. 5.3.2) */
  version: PropTypes.string
};


export default TopNav;