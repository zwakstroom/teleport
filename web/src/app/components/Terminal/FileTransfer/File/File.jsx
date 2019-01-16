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

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Text } from 'shared/components';
import * as Icon from 'shared/components/Icon';
import { Uploader, Downloader } from 'app/services/fileTransfer';
import withHttpRequest from './withHttpRequest';

export default class File extends Component {

  static propTypes = {
    file: PropTypes.object.isRequired,
    httpResponse: PropTypes.object,
    onRemove: PropTypes.func.isRequired,
  }

  savedToDisk = false;

  onRemove = () => {
    this.props.onRemove(this.props.file.id);
  }

  componentDidUpdate() {
    const { isCompleted, isUpload } = this.props.file;
    if (isCompleted && !isUpload) {
      this.saveToDisk(this.props.httpResponse)
    }
  }

  saveToDisk({ fileName, blob }) {
    if (this.savedToDisk) {
      return;
    }

    this.savedToDisk = true;

    // if IE11
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
      return;
    }

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  render() {
    const { httpProgress, file } = this.props;
    const {name, isFailed, isProcessing, isCompleted, error} = file;
    let cancelButton = null;
    let errMessage = null;
    let status = null;
    let color = "terminal";

    if(isProcessing) {
      cancelButton = <CloseButton onClick={this.onRemove}><Icon.Close/></CloseButton>;
      status = `${httpProgress}%`;
    }

    if(isFailed) {
      errMessage = <Text color="error">{error} </Text> ;
      status = "failed";
      color = "error";
    }

    if(isCompleted) {
      status = "complete";
    }

    return (
      <tr>
        <td colSpan="100%">
          <ProgressRow>
            <ProgressIndicator status={status} progress={httpProgress}>
              {name}
            </ProgressIndicator>
            {cancelButton}
            <ProgressStatus color={color}>{status}</ProgressStatus>
          </ProgressRow>

          <ErrorRow>{errMessage}</ErrorRow>
        </td>
      </tr>
    )
  }
}

const FileToSend = withHttpRequest(Uploader)(File);
const FileToReceive = withHttpRequest(Downloader)(File);

export {
  FileToReceive,
  FileToSend
}

const ErrorRow = styled.div`
  display: block;
  height: 16px;
  line-height: 16px;
  margin: 4px 0 16px 0;
`;

const ProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProgressStatus = styled(Text)`
  fontSize: 12px;
  height: 24px;
  line-height: 24px;
  width: 80px;
  text-align: right;
`;

const ProgressIndicator = styled.div`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.terminalDark} 0%,
    ${props => props.theme.colors.terminalDark} ${props => props.progress}%,
    ${props => props.theme.colors.bgTerminal} 0%, ${props => props.theme.colors.bgTerminal} 100%
  );

  background: ${props => props.status === "complete" ? 'none' : ''};
  color: ${props => props.status === "complete" ? props.theme.colors.inverse : props.theme.colors.terminal};
  height: 24px;
  line-height: 24px;
  width: 80%;
`;

const CloseButton = styled.button`
  background: ${props => props.theme.colors.error};
  border: none;
  border-radius: 2px;
  font-size: 12px;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  height: 12px;
  line-height: 12px;
  margin: 6px 8px;
  outline: none;
  padding: 0;
  transition: all .3s;
  width: 12px;

  &:hover {
    background: ${props => props.theme.colors.error};
  }
`