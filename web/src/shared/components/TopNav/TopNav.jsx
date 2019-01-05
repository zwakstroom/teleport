import React from 'react';
import styled from 'styled-components';

const TopNav = ({
  children,
}) => {
  return (
    <StyledNav>
      {children}
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default TopNav;


