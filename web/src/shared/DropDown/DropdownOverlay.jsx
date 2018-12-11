import styled from 'styled-components';
import {z} from '../theme';


export const DropdownOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${z[1]};
`;
