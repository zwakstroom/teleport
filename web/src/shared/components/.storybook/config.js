import React from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import theme from './../theme';
import ThemeProvider from '../ThemeProvider';
import Box from './../Box';

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <Box m={2}>
      {storyFn()}
    </Box>
  </ThemeProvider>
)

addDecorator(ThemeDecorator);

const req = require.context('./../', true, /\.story.js$/)
const loadStories = () => {
    req.keys().forEach(req)
    require('../../../app/components/.storybook/index.js')
}

configure(loadStories, module);