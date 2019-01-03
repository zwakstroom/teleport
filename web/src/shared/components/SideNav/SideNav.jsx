import styled from 'styled-components';
import theme from './../theme'

const SideNav = styled.nav`
  background: ${props => props.theme.background.secondary};
  bottom: 0;
  width: 240px;
  left: 0;
  overflow: auto;
  position: ${props => props.static ? 'relative' : 'fixed'};
  top: 0;
`;

SideNav.displayName = 'SideNav';

SideNav.defaultProps = {
  theme: theme
}

export default SideNav;