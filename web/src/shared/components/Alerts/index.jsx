import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space } from 'styled-system'
import { background, colors } from '../theme';

const alertType = props => {
  switch (props.type) {
    case 'danger':
      return {
        background: background.error,
        borderColor: colors.error,
        color: colors.error
      }
    case 'info':
      return {
        background: background.error,
        color: colors.text
      }
    case 'warning':
      return {
        background: background.error,
        color: colors.text
      }
    case 'success':
      return {
        background: background.error,
        color: colors.text
      }
    default:
      return {
        background: background.error,
        color: colors.text
      }
  }
}


const Alert = styled.div`
  border-width: 2px;
  border-style: solid;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  margin: 0 0 16px 0;
  padding: 8px 16px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  word-break: break-all;

  ${space}
  ${alertType}
`

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Alert.propTypes = {
  /** Size */
  type: PropTypes.oneOf(['danger', 'info', 'warning', 'success']),

  /** Margin */
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray
}

Alert.defaultProps = {
  size: 'danger'
}

Alert.displayName = 'Alert'

export default Alert


export const Danger = props => (
  <Alert type="danger">
    {props.children}
  </Alert>
)

export const Warning = props => (
  <Alert type="warning">
    {props.children}
  </Alert>
)

export const Info = props => (
  <Alert type="info">
    {props.children}
  </Alert>
)

export const Success = props => (
  <Alert type="success">
    {props.children}
  </Alert>
)

