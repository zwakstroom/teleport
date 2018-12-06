import styled from 'styled-components'
import { space,  propTypes } from 'styled-system'
import PropTypes from 'prop-types'
import theme from './../theme'

const borders = ({ color, theme }) => {
  const borderColor = color ? theme.colors[color] : theme.colors.borderGray
  const focusColor = color ? borderColor : theme.colors.blue
  return {
    'border-color': borderColor,
    'box-shadow': `0 0 0 1px ${borderColor}`,
    ':focus': {
      outline: 0,
      'border-color': focusColor,
      'box-shadow': `0 0 0 2px ${focusColor}`
    }
  }
}

const Input = styled.input`
  appearance: none;
  display: block;
  width: 100%;
  font-family: inherit;
  color: inherit;
  font-size: 16px;
  background-color: white;
  border-radius: 4px;
  border: none;
  padding: 0 16px;
  margin: 0;
  line-height: 40px;
  height: 40px;
  box-sizing: border-box;

  ::placeholder {
    color: #CFD8DC;
  }

  ::-ms-clear {
    display: none;
  }

  ${borders} ${space};
`

Input.displayName = 'Input'
Input.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  ...propTypes.borders,
  ...propTypes.space
}

Input.defaultProps = {
  theme: theme
}

export default Input