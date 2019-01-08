import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space } from 'styled-system'
import { colors } from '../theme';

const alertType = props => {
  switch (props.status) {
    case 'danger':
      return {
        background: colors.error,
        color: colors.light
      }
    case 'info':
      return {
        background: colors.info,
        color: colors.light
      }
    case 'warning':
      return {
        background: colors.warning,
        color: colors.light
      }
    case 'success':
      return {
        background: colors.success,
        color: colors.light
      }
    default:
      return {
        background: colors.error,
        color: colors.light
      }
  }
}

export const Danger = props => (
  <Alert status="danger">
    {props.children}
  </Alert>
);

export const Warning = props => (
  <Alert status="warning">
    {props.children}
  </Alert>
);

export const Info = props => (
  <Alert status="info">
    {props.children}
  </Alert>
);

export const Success = props => (
  <Alert status="success">
    {props.children}
  </Alert>
);

const Alert = styled.div`
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 0 2px rgba(0, 0, 0, .12),  0 2px 2px rgba(0, 0, 0, .24);
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 16px 0;
  min-height: 56px;
  padding: 16px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  word-break: break-all;
  ${space}
  ${alertType}
`;

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
]);

Alert.propTypes = {
  status: PropTypes.oneOf(['danger', 'info', 'warning', 'success']),
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray
};

Alert.defaultProps = {
  status: 'danger'
};

Alert.displayName = 'Alert';

export default Alert;