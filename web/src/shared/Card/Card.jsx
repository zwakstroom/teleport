import styled from 'styled-components'
import Box from './../Box'
import theme from './../theme'
import PropTypes from 'prop-types'

const Card = styled(Box)`
  box-shadow: 0 0 32px rgba(0, 0, 0, .12), 0 8px 32px rgba(0, 0, 0, .24);
  border-radius: 12px;
  background-color: ${props => props.theme.background.secondary};
  box-sizing: border-box;
`

Card.propTypes = {
  boxShadowSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  borderColor: PropTypes.string,
  borderWidth: PropTypes.oneOf([1, 2])
}

Card.defaultProps = {
  theme: theme
}

Card.displayName = 'Card'

export default Card