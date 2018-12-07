import React from 'react';
import Box from './../Box';

export const Danger = props => (
  <Box color="red">
    {props.children}
  </Box>
)

export const Warning = props => (
  <Box color="yellow">
    {props.children}
  </Box>
)

export const Info = props => (
  <Box color="blue">
    {props.children}
  </Box>
)

export const Success = props => (
  <Box color="blue">
    {props.children}
  </Box>
)

