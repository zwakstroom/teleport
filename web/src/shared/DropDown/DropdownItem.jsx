import styled, { css } from 'styled-components';
import {background, colors} from '../theme';

const dropdownItemActive = (props) => (
  props.active &&
  css`
    color: #fff;
    text-decoration: none;
    background-color: #007bff;
  `
);

const dropdownItemDisabled = (props) => (
  props.disabled &&
  css`
    color: #6c757d;
    background-color: transparent;
  `
);

export const DropdownItem = styled.a`
  background-color: ${background.light};
  border-bottom: 1px solid ${colors.subtle};
  font-size: 11px;
  font-weight: bold;
  color: ${colors.text};
  cursor: pointer;
  display: block;
  line-height: 48px;
  padding: 0 32px;
  text-align: inherit;
  text-decoration: none;
  text-transform: uppercase;
  transition: all .3s;
  white-space: nowrap;

  &:hover,
  &:focus {
    color: ${colors.link};
    text-decoration: none;
    background-color: #f8f9fa;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
    border: none;
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }



  ${dropdownItemActive};
  ${dropdownItemDisabled};

`;
