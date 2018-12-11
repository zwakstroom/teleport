import styled, { css, keyframes } from 'styled-components';
import {background, z} from '../theme';

const dropdownMenuHidden = (props) => (
  props.hidden ? css`display: none;` : css`display: block;`
);

const location = props => {
  switch (props.location) {
    case 'left':
      return {
        left: '0',
        right: 'auto'
      }
    case 'right':
      return {
        right: '0',
        left: 'auto'
      }
    case 'topRight':
      return {
        right: '8px',
        left: 'auto',
        top: '8px'
      }
    default:
      return {
        left: '0',
        right: 'auto'
      }
  }
}

const fadeIn  = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;


export const DropdownMenu = styled.div`
  animation-duration: .3s;
  animation-fill-mode: both;
  animation-name: ${fadeIn};
  background: ${background.light};
  border-radius: 8px;
  box-shadow: 0 0 64px rgba(0, 0, 0, .56), 0 8px 32px rgba(0, 0, 0, .24);
  left: 0;
  overflow: hidden;
  padding: 8px;
  position: absolute;
  top: 100%;
  z-index: ${z[2]};
  ${dropdownMenuHidden}
  ${location}
`;
