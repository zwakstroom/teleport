import styled from 'styled-components';
import {z} from './../constants'

const SideNav = styled.nav`
  background: ${props => props.theme.background.secondary};
  bottom: 0;
  width: 240px;
  left: 0;
  overflow: auto;
  padding-top: 72px;
  position: ${props => props.static ? 'relative' : 'fixed'};
  top: 0;
  z-index: ${z.zmax1};
`;

SideNav.displayName = 'SideNav';
export default SideNav;