import React from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import theme from './../theme';
import ThemeProvider from '../ThemeProvider';

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
)

addDecorator(ThemeDecorator);

const req = require.context('.', true, /\.story.js$/)
const loadStories = () => {
    req.keys().forEach(req)
    require('../../../app/components/.storybook/index.js')
}

configure(loadStories, module);