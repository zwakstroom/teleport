import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TopNavLogo from './TopNavLogo/TopNavLogo';
import {z} from './../constants';

const TopNav = ({
  logoSrc,
  version,
  children,
  isStatic,
}) => {
  return (
    <StyledNav isStatic={isStatic}>
      <TopNavLogo src={logoSrc} version={version} />
      {children}
    </StyledNav>
  );
}

TopNav.propTypes = {
  /** The version of the product (ex. 5.3.2) */
  version: PropTypes.string,
  logoSrc: PropTypes.string,
};

TopNav.defaultProps = {
  version: 'v#'
}

const StyledNav = styled.nav`
  left: 0;
  display: block;
  position: ${props => props.isStatic ? 'relative' : 'fixed'};
  right: 0;
  top: 0;
  z-index: ${z.zmax2};
`;

export default TopNav;