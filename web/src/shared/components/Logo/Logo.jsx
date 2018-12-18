import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Logo = ({ src }) => {
  return (
    <StyledImg src={src} />
  );
};

Logo.propTypes = {
  /** Image Src */
  src: PropTypes.string,
};

Logo.displayName = 'Logo';

export default Logo;

const StyledImg = styled.img`
  display: block;
  outline: none;
  margin: 32px auto;
`;