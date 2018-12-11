import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TopNavButton from '../TopNavButton'
import teleportLogoSvg from './teleport-logo.svg';
import gravityLogoSvg from './gravity-logo.svg';

const LogoButton = styled(TopNavButton)`
  margin: 0 80px 0 0;

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
const TopNavLogo = ({ className, product, version}) => {
  const logoSvg = product === 'gravity' ? gravityLogoSvg : teleportLogoSvg;
  return (
    <LogoButton className={className}>
      <img src={logoSvg} />
      <em>{version}</em>
    </LogoButton>
  );
};

TopNavLogo.propTypes = {
  product: PropTypes.oneOf(['gravity', 'teleport']),
  href: PropTypes.string,
  version: PropTypes.string,
};

TopNavLogo.defaultProps = {
  product: 'gravity',
  href: '/',
  version: 'v#'
}

TopNavLogo.displayName = 'TopNavLogo';


export default TopNavLogo;