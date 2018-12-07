import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from './../theme'


const TopNavLogo = styled.button`
  background: ${props => props.theme.background.secondary};
  border: none;
  border-bottom: 4px solid ${props => props.active ? props.theme.colors.accent : props.theme.background.secondary};
  color: ${props => props.active ? props.theme.colors.light : 'rgba(255, 255, 255, .56)'};
  cursor: pointer;
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  line-height: 72px;
  margin: 0;
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

  &:active {
    background: ${props => props.theme.background.primary};
    color: ${props => props.theme.colors.light};
    border-bottom: none;
    padding-bottom: 4px;
  }
`;




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