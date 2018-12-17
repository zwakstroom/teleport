import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

/**
 * Css styles for NavItems
 */
const styledTopNavItemCss = css`
  background: ${props => props.theme.background.secondary};
  border: none;
  border-bottom:  ${props => props.active ? `4px solid ${props.theme.colors.accent}` : 'none'};
  box-sizing: border-box;
  color: ${props => props.active ? props.theme.colors.light : 'rgba(255, 255, 255, .56)'};
  cursor: pointer;
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  line-height: ${props => props.active ? '68px' : '72px'};
  margin: 0;
  outline: none;
  padding: 0 16px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all .3s;
  -webkit-font-smoothing: antialiased;

  &:hover {
    background:  ${props => props.active ? props.theme.background.secondary : 'rgba(255, 255, 255, .06)'};
    border-bottom:  ${props => props.active ? `4px solid ${props.theme.colors.accent}` : 'none'};
  }

  &:active, {
    background:  ${props => props.active ? props.theme.background.secondary : props.theme.background.primary};
    color: ${props => props.theme.colors.light};
    border-bottom:  ${props => props.active ? `4px solid ${props.theme.colors.accent}` : 'none'};
  }

  &.active {
    color: ${props => props.theme.colors.light};
    line-height: 68px;
    border-bottom: ${props => `4px solid ${props.theme.colors.accent}` }
  }
`;

/**
 * TopNavItem
 */
const TopNavItem = styled.div`
  ${styledTopNavItemCss}
`

TopNavItem.displayName = 'TopNavItem';

/**
 * TopNavItemLink
 */
const TopNavItemLink = styled(NavLink)`
  ${styledTopNavItemCss}
`

TopNavItemLink.displayName = 'TopNavItemLink';

export default TopNavItem;

export {
  TopNavItemLink
}