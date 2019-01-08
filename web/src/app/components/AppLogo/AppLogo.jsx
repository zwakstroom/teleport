import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import cfg from 'app/config';
import LogoButton from 'shared/components/LogoButton';
import teleportLogo from 'shared/assets/images/teleport-logo.svg';

const AppLogo = ({
  version = '3.1.2.beta',
}) => {
  return (
    <LogoButton src={teleportLogo} version={version} as={props => (
      <NavLink {...props} to={cfg.routes.app} />
    )}/>
  );
};

AppLogo.propTypes = {
  src: PropTypes.string,
  version: PropTypes.string,
};

AppLogo.displayName = 'AppLogo';


export default AppLogo;