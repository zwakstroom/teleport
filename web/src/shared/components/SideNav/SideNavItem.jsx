import styled from 'styled-components';
import theme from './../theme'

const SideNavItem = styled.button`
  background: ${props => props.theme.colors.bgSecondary};
  border: none;
  box-sizing: border-box;
  color: rgba(255, 255, 255, .56);
  cursor: pointer;
  display: block;
  font-size: 12px;
  font-weight: 600;
  line-height: 72px;
  margin: 0;
  outline: none;
  padding: 0 32px 0 72px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: background .3s, color .3s;
  width: 100%;
  -webkit-font-smoothing: antialiased;

  &:hover {
    background: rgba(255, 255, 255, .024);
  }

  &:active,
  &.active {
    background:  ${props => props.theme.colors.bgTertiary};
    border-left: 4px solid ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.light};
    padding: 0 32px 0 68px;

    .icon {
      left: 28px;
      opacity: 1;
    }
  }

  .icon {
    box-sizing: border-box;
    font-size: 20px;
    height: 24px;
    left: 32px;
    opacity: .56;
    padding: 2px 0;
    position: absolute;
    text-align: center;
    top: 24px;
    width: 24px;
  }
`;

SideNavItem.displayName = 'SideNavItem';
SideNavItem.defaultProps = {
  theme: theme
}

export default SideNavItem;