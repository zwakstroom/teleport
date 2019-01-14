import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space } from 'styled-system'
import defaultTheme from './../theme'

const size = props => {
  switch (props.size) {
    case 'small':
      return {
        fontSize: '10px',
        lineHeight: '24px',
        padding: '0 8px'
      }
    case 'medium':
      return {
        fontSize: `12px`,
        lineHeight: '40px',
        padding: '0 32px'
      }
    case 'large':
      return {
        fontSize: '14px',
        lineHeight: '56px',
        padding: '0 40px'
      }
    default:
      return {
        fontSize: `10px`,
        lineHeight: '40px',
        padding: '0 24px'
      }
  }
}

const color = props => {
  const { theme, secondary, warning, link } = props;

  if(secondary) {
    return  {
      background: theme.colors.secondary,
      '&:hover, &:focus': {
        background: theme.colors.secondaryLight,
      }
    };
  }

  if(link) {
    return  {
      color: theme.colors.link,
      fontWeight: 'normal',
      background: 'none',
      textDecoration: 'underline',
      textTransform: 'none',

      '&:hover, &:focus': {
        background: theme.colors.bgSecondary,
      }
    };
  }

  if(warning) {
    return {
      background: theme.colors.error,
      '&:hover, &:focus': {
        background: theme.colors.errorDark
      },
      '&:active': {
        opacity: .56
      }
    };
  }

  return {
    background: theme.colors.primary
  };
}

const block = props => (props.block ? {
  boxSizing: 'border-box',
  display: 'block',
  width: '100%'
} : null)

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  display: inline-block;
  line-height: 40px;
  outline: none;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all .3s;
  -webkit-font-smoothing: antialiased;

  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: rgba(255, 255, 255, .24);
    box-shadow: none;
  }

  &:disabled {
    background: rgba(255, 255, 255, .24);
    color: rgba(0, 0, 0, .24);
  }

  ${color}
  ${block}
  ${size}
  ${space}
`

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Button.propTypes = {
  /** Size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  block: PropTypes.bool,
  secondary: PropTypes.bool,
  /** Margin */
  m: numberStringOrArray,
  mt: numberStringOrArray,
  mr: numberStringOrArray,
  mb: numberStringOrArray,
  ml: numberStringOrArray,
  mx: numberStringOrArray,
  my: numberStringOrArray
}

Button.defaultProps = {
  size: 'medium',
  theme: defaultTheme
}

Button.displayName = 'Button'

export default Button