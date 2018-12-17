import React from 'react';
import styled, {css} from 'styled-components';
import { NavLink } from 'react-router-dom'
import { background } from './../theme';

const StyledNav = styled.nav`
  background: ${background.primary};
  width: 240px;
  overflow: auto;
`;

const SideNavItemCss = css`
  background: ${props => props.active ? props.theme.background.secondary : props.theme.background.primary};
  border: none;
  box-sizing: border-box;
  color: ${props => props.active ? props.theme.colors.light : 'rgba(255, 255, 255, .56)'};
  cursor: pointer;
  display: block;
  font-size: 11px;
  font-weight: 600;
  line-height: ${props => props.active ? '68px': '72px'};
  margin: 0;
  outline: none;
  padding: 0 32px;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  transition: all .3s;
  width: 100%;
  -webkit-font-smoothing: antialiased;

  &:hover {
    background:  ${props => props.active ? props.theme.background.secondary : 'rgba(255, 255, 255, .06)'};
  }

  &:active, &.active {
    background:  ${props => props.active ? props.theme.background.secondary : props.theme.background.primary};
    color: ${props => props.theme.colors.light};
  }
`;

const SideNav = props => (
  <StyledNav {...props}>
    {props.children}
  </StyledNav>
)

SideNav.displayName = 'SideNav';

const SideNavItem = styled.div`
  ${SideNavItemCss}
`;

SideNavItem.displayName = 'SideNavItem';

const SideNavItemLink = styled(NavLink)`
  ${SideNavItemCss}
`

SideNavItem.displayName = 'SideNavItemLink';

export default SideNav;

export {
  SideNavItem,
  SideNavItemLink
}