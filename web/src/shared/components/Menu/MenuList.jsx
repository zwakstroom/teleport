import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from './../theme'

class MenuList extends React.Component {
  render() {
    const { children, ...other } = this.props;
    return (
      <StyledMenuList
        role="menu"
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        {...other}
      >
        {children}
      </StyledMenuList>
    );
  }
}

MenuList.defaultProps = {
  theme: theme
}

MenuList.propTypes = {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  menuListCss: PropTypes.func,
};

const StyledMenuList = styled.div`
  background-color: ${props => props.theme.background.light};
  box-shadow: 0 8px 24px rgba(0, 0, 0, .24);
  border-radius: 4px;


  ${ props => props.menuListCss && props.menuListCss(props) }
`


export default MenuList;