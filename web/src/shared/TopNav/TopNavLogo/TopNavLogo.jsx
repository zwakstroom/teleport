import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../../theme'
import TopNavButton from '../TopNavButton'
import SVG from './gravity-logo'


const Logo = styled(TopNavButton)`
  background: ${props => props.theme.background.secondary};
  border: none;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  line-height: 72px;
  margin: 0 80px 0 0;
  outline: none;
  padding: 0 16px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all .3s;
  -webkit-font-smoothing: antialiased;

  &:hover {
    background: rgba(255, 255, 255, .06);
    border-bottom: none;
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

  const productName = product === 'gravity' ? 'Gravity' : 'Teleport';

  return (
    <Logo className={className}>
    <SVG/><em>{version}</em>
    </Logo>
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