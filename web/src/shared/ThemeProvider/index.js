import React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
    margin: 0;
    font-family: ${props => props.theme.font};
  }
`

const ThemeProvider = props => (
  <StyledThemeProvider theme={props.theme}>
    <React.Fragment>
      <GlobalStyle/>
      {props.children}
    </React.Fragment>
  </StyledThemeProvider>
)

export default ThemeProvider;
