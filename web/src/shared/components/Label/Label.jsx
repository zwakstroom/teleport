import styled from 'styled-components'
import PropTypes from 'prop-types'

const Label = styled.label`
  color: ${props => props.hasError ? props.theme.colors.error : props.theme.colors.light };
  display: block;
  font-size: 11px;
  font-weight: 500;
  margin: 0 0 8px 0;
  opacity: ${props => props.hasError ? 1 : .87 };
  text-transform: uppercase;
  width: 100%;
`

Label.propTypes = {
  hasError: PropTypes.bool
}

Label.defaultProps = {
  hasError: false,
  fontSize: 0
}

Label.displayName = 'Label'

export default Label
