import styled from 'styled-components';
import theme from './../theme'

const SideNav = styled.nav`
  background: ${props => props.theme.background.primary};
  width: 240px;
  overflow: auto;
`;

SideNav.displayName = 'SideNav';

SideNav.defaultProps = {
  theme: theme
}

export default SideNav;