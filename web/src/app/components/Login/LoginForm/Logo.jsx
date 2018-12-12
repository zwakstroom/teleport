import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import teleportMedallion from './teleport-medallion.svg';
import gravityMedallion from './gravity-medallion.svg';

const Img = styled.img`
  display: block;
  outline: none;
  margin: 32px auto;
`;

const Logo = ({ product }) => {
  const logoSvg = product === 'gravity' ? gravityMedallion : teleportMedallion;

  return (
    <Img src={logoSvg} />
  );
};


Logo.propTypes = {
  /** Product Name */
  product: PropTypes.oneOf(['gravity', 'teleport']),
};

Logo.defaultProps = {
  product: 'teleport'
};

Logo.displayName = 'Logo';

export default Logo;