import styled from 'styled-components'
import PropTypes from 'prop-types'


const Label = styled.label`
  color: ${props => props.hasError ? props.theme.colors.warning : props.theme.colors.light }
  display: block;
  font-size: 11px;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  width: 100%;
`

Label.propTypes = {
  hasError: PropTypes.string.isRequired
}

Label.defaultProps = {
  hasError: false
}

Label.displayName = 'Label'

export default Label
