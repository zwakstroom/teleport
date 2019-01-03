import styled from 'styled-components';
import theme from './../theme'

const SideNavItem = styled.button`
  background: ${props => props.active ? props.theme.background.tertiary : props.theme.background.secondary};
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
    background:  ${props => props.active ? props.theme.background.tertiary : props.theme.background.secondary};
    color: ${props => props.theme.colors.light};
  }
`;

SideNavItem.displayName = 'SideNavItem';
SideNavItem.defaultProps = {
  theme: theme
}

export default SideNavItem;