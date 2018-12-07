import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../../theme'
import TopNavButton from '../TopNavButton'
import GravityLogo from './gravity-logo'


const LogoButton = styled(TopNavButton)`
  &:hover {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:active {
    background: ${props => props.theme.background.primary};
    color: ${props => props.theme.colors.light};
    padding-bottom: 4px;
  }

  svg {
    display: inline-block;
    float: left;
    height: 24px;
    margin: 24px 8px 24px 16px;
  }

  em {
    font-size: 10px;
    font-weight: bold;
    font-style: normal;
    margin: 0;
  }
`;

// This could be react-router-dom's Link for example
const TopNavLogo = ({ className, children, product, version}) => {
  const logo = product === 'gravity' ? <GravityLogo/> : null;
  console.log(product)
  return (
    <LogoButton className={className}>
      {logo}<em>{version}</em>
    </LogoButton>
  );
};



TopNavLogo.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string,
};

TopNavLogo.defaultProps = {
  active: false,
  href: '#'
}

TopNavLogo.displayName = 'TopNavLogo';


export default TopNavLogo;