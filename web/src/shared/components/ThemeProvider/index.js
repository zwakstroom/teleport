import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { GlobalStyle } from './globals';
import theme from './../theme';

const ThemeProvider = props => (
  <StyledThemeProvider theme={props.theme || theme}>
    <React.Fragment>
      <GlobalStyle/>
      {props.children}
    </React.Fragment>
  </StyledThemeProvider>
)

export default ThemeProvider;
