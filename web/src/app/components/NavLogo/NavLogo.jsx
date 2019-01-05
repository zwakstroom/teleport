import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import TopNavItem from 'shared/components/TopNav/TopNavItem'
import cfg from 'app/config';

const NavLogo = ({
  src,
  version = ''
}) => {
  return (
    <NavLink to={cfg.routes.app}>
      <StyledLogo>
        <img src={src} />
        <em>{version}</em>
      </StyledLogo>
    </NavLink>
  );
};

NavLogo.propTypes = {
  src: PropTypes.string,
  version: PropTypes.string,
};

NavLogo.displayName = 'NavLogo';

const StyledLogo = styled(TopNavItem)`
  margin: 0;
  width: 240px;

  img {
    display: inline-block;
    float: left;
    height: 24px;
    margin: 24px 0 24px 16px;
  }

  em {
    display: inline-block;
    font-size: 10px;
    font-weight: bold;
    font-style: normal;
    margin: 0;
  }
`;


export default NavLogo;