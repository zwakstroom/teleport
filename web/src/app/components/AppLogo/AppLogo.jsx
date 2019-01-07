import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import TopNavItem from 'shared/components/TopNav/TopNavItem'
import cfg from 'app/config';

const AppLogo = ({
  src,
  version = '',
  className
}) => {
  return (
    <StyledLogo className={className} as={props => (
      <NavLink className={props.className} to={cfg.routes.app} >
        <img src={src} />
        <em>{version}</em>
      </NavLink>
    )}/>
  );
};

AppLogo.propTypes = {
  src: PropTypes.string,
  version: PropTypes.string,
};

AppLogo.displayName = 'AppLogo';

export const StyledLogo = styled(TopNavItem)`
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


export default AppLogo;