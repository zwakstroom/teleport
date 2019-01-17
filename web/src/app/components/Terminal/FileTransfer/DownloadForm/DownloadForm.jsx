/*
Copyright 2018 Gravitational, Inc.

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
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class FileDownloadSelector extends React.Component {

  static propTypes = {
    onDownload: PropTypes.func.isRequired,
  }

  state = {
    path: '~/'
  }

  onChangePath = e => {
    this.setState({
      path: e.target.value
    })
  }

  isValidPath(path) {
    return path && path[path.length - 1] !== '/';
  }

  onDownload = () => {
    if (this.isValidPath(this.state.path)) {
      this.props.onDownload(this.state.path)
    }
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.onDownload();
    }
  }

  moveCaretAtEnd(e) {
    const tmp = e.target.value;
    e.target.value = '';
    e.target.value = tmp;
  }

  render() {
    const { path } = this.state;
    const isBtnDisabled = !this.isValidPath(path);
    return (
      <Downloader>
        <header>(SCP) Download Files</header>

        <StyledLabel>Full path of file</StyledLabel>
        <StyledInput onChange={this.onChangePath}
          ref={e => this.inputRef = e}
          value={path}
          autoFocus
          onFocus={this.moveCaretAtEnd}
          onKeyDown={this.onKeyDown}
        />
        <DownloadButton
          disabled={isBtnDisabled}
          onClick={this.onDownload}>
          Download
        </DownloadButton>
      </Downloader>
    )
  }
}



const Downloader = styled.div`
  font-size: ${props => props.theme.fontSizes[0]}px;
  color: ${props => props.theme.colors.terminal};

  header {
    font-size: ${props => props.theme.fontSizes[0]}px;
    font-weight: 800;
    line-height: 16px;
    margin: 0 0 16px 0;
    text-transform: uppercase;
  }
`;

const DownloadButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.colors.terminal};
  box-sizing: border-box;
  color: ${props => props.theme.colors.terminal};
  height: 24px;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  width: 88px;
`;

const StyledLabel = styled.label`
  color: ${props => props.theme.colors.terminal};
  display: block;
  margin: 0 0 8px 0;
  line-height: 24px;
  text-transform: uppercase;
`

const StyledInput = styled.input`
  background: ${props => props.theme.colors.bgTerminal};
  border: none;
  box-sizing: border-box;
  color: ${props => props.theme.colors.terminal};
  height: 24px;
  margin: 0 16px 32px 0;
  outline: none;
  padding: 0 8px;
  width: 360px;
`