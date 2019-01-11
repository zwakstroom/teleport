import styled from 'styled-components'
import PropTypes from 'prop-types'
import {colors} from './../theme'
import { space, width } from 'styled-system'

const Input = styled.input`
  appearance: none;
  border-radius: 4px;
  background: ${props => props.hasError ? props.theme.colors.bgError : '#FFF' };
  border: ${props => props.hasError ? `2px solid ${props.theme.colors.error}` : 'none' };
  box-sizing: border-box;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, .24);
  color: ${colors.text};
  font-family: inherit;
  font-size: 16px;
  display: block;
  height: 40px;
  line-height: 40px;
  margin: 0 0 24px 0;
  outline: none;
  padding: 0 16px;
  transition: all .3s;
  width: 100%;

  ::-ms-clear {
    display: none;
  }

  ::placeholder {
    color: ${props => props.theme.colors.subtle};
  }

  ${space} ${width};
`

Input.displayName = 'Input'

Input.propTypes = {
  placeholder: PropTypes.string,
  hasError: PropTypes.bool
}

export default Input