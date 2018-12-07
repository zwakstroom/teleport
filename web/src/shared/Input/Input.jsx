import styled from 'styled-components'
import PropTypes from 'prop-types'
import defaultTheme from './../theme'
import { space, themeGet, propTypes } from 'styled-system'

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
  color: ${ props => props.theme.text};
  font-size: ${themeGet('fontSizes.2')}px;

  border-radius: 4px;
  border: none;
  padding: 0 16px;
  margin: 0;
  line-height: 40px;
  height: 40px;
  box-sizing: border-box;

  ::-ms-clear {
    display: none;
  }

  ::placeholder {
    color: ${themeGet('colors.gray')};
  }

  ${borders} ${space};
`

Input.displayName = 'Input'
Input.propTypes = {
  color: PropTypes.string,
  ...propTypes.borders,
  ...propTypes.space
}

Input.defaultProps = {
  theme: defaultTheme
}

export default Input