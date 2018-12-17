import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TopNavItem from '../TopNavItem'

const TopNavLogo = ({
  className,
  src,
  version
}) => {
  return (
    <StyledLogo className={className}>
      <img src={src} />
      <em>{version}</em>
    </StyledLogo>
  );
};

TopNavLogo.propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

TopNavLogo.defaultProps = {
  src: '/',
  onClick: () => { },
  title: 'Empty Title',
}

TopNavLogo.displayName = 'TopNavLogo';

const StyledLogo = styled(TopNavItem)`
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


export default TopNavLogo;