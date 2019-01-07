import styled from 'styled-components'

/**
 * TopNavItem
 */
const TopNavItem = styled.button`
  background: none;
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
    background:  ${props => props.active ? props.theme.colors.bgSecondary : 'rgba(255, 255, 255, .06)'};
    border-bottom:  ${props => props.active ? `4px solid ${props.theme.colors.accent}` : 'none'};
  }

  &:active, {
    background:  ${props => props.active ? props.theme.colors.bgSecondary : props.theme.colors.bgPrimary};
    color: ${props => props.theme.colors.light};
    border-bottom:  ${props => props.active ? `4px solid ${props.theme.colors.accent}` : 'none'};
  }
`

TopNavItem.displayName = 'TopNavItem';


export default TopNavItem;
