import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from 'shared/components/Typography';
import InputSearch from 'app/components/InputSearch';

const Header = ({
  title = '',
  onSearchChange = null,
  searchValue = ''
}) => {
  let $search = null;

  if(onSearchChange) {
    $search = <InputSearch value={searchValue} onChange={onSearchChange} />;
  }

  return (
    <StyledHeader>
      <Typography.h1>{title}</Typography.h1>
      {$search}
    </StyledHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  searchValue: PropTypes.string,
};

Header.displayName = 'Header';

export default Header;

const StyledHeader = styled.header`
  height: 40px;

  &::after {
    content: "";
    clear: both;
    display: table;
  }

  h1 {
    float: left;
    margin: 0 40px 0 0;
  }
`;