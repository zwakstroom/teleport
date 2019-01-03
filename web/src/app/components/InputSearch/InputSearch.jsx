/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import styled from 'styled-components';
import {Magnifier} from 'shared/components/Icon/Icon';

class InputSearch extends React.Component {

  constructor(props) {
    super(props);
    this.debouncedNotify = debounce(() => {
      this.props.onChange(this.state.value);
    }, 200);

    let value = props.value || '';

    this.state = {
      value,
      isFocused: false,
    };
  }

  onBlur = e => {
    this.setState({ isFocused: false });
    console.log('blur');
  }

  onFocus = e => {
    this.setState({ isFocused: true });
    console.log('focus');
  }

  onChange = e => {
    this.setState({ value: e.target.value });
    this.debouncedNotify();
  }

  componentDidMount() {
    // set cursor
    const $el = ReactDOM.findDOMNode(this);

    if ($el) {
      const $input = $el.querySelector('input')
      const length = $input.value.length;
      $input.selectionEnd = length;
      $input.selectionStart = length;
    }
  }

  render() {
    let { className = '', autoFocus = false } = this.props;
    const isFocused = this.state.isFocused ? 'is-active' : '';

    return (
      <SearchField className={isFocused}>
        <Magnifier  />
        <input placeholder="Search..." className="form-control"
          autoFocus={autoFocus}
          value={this.state.value}
          onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
      </SearchField>
    );
  }
}


const SearchField = styled.div`
  float: left;
  height: 40px;
  margin: 0;
  position: relative;

  &.is-active {
    .icon {
      color: ${props => props.theme.background.secondary};
    }
  }

  .icon {
    font-size: 20px;
    left: 12px;
    opacity: .24;
    position: absolute;
    top: 12px;
    z-index: 1;
  }

  input {
    background: ${props => props.theme.background.secondary};
    border: none;
    border-radius: 200px;
    color: ${props => props.theme.colors.light};
    font-size: 14px;
    font-weight: 300;
    height: 40px;
    outline: none;
    padding: 0 16px 0 40px;
    transition: all .3s;

    &:focus, &:active {
      background: ${props => props.theme.background.light};
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, .24);
      color: ${props => props.theme.colors.link};
    }

          // PLACEHOLDER TEXT
    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: ${props => props.theme.colors.subtle};
      font-size: 12px;
      text-transform: uppercase;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      color: ${props => props.theme.colors.subtle};
      font-size: 12px;
      text-transform: uppercase;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: ${props => props.theme.colors.subtle};
      font-size: 12px;
      text-transform: uppercase;
    }
    &:-moz-placeholder { /* Firefox 18- */
      color: ${props => props.theme.colors.subtle};
      font-size: 12px;
      text-transform: uppercase;
    }
  }
`;

export default InputSearch;
