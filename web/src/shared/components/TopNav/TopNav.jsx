import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { background } from './../theme';
import TopNavLogo from './TopNavLogo/TopNavLogo';

const TopNav = ({
  logoSrc,
  version,
  children
}) => {
  return (
    <StyledNav>
      <TopNavLogo
        src={logoSrc}
        version={version}
      />
      {children}
    </StyledNav>
  );
}

TopNav.propTypes = {
  /** The version of the product (ex. 5.3.2) */
  version: PropTypes.string
};

const StyledNav = styled.nav`
  background: ${background.secondary};
  box-shadow: 0 8px 24px rgba(0, 0, 0, .24);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default TopNav;