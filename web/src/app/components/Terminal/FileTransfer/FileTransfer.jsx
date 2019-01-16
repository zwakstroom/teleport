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
import { FileToReceive, FileToSend } from './File';
import DownloadForm from './DownloadForm';
import UploadForm from './UploadForm';
import { Text } from 'shared/components';
import * as Icon from 'shared/components/Icon';

export default class FileTransferDialog extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    onTransferRemove: PropTypes.func.isRequired,
    onTransferStart: PropTypes.func.isRequired,
    onTransferUpdate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  }

  transfer(location, name, isUpload, blob=[]) {
    this.props.onTransferStart({
      location,
      name,
      isUpload,
      blob
    })
  }

  onDownload = location => {
    this.transfer(location, location, false)
  }

  onUpload = (location, filename, blob) => {
    this.transfer(location, filename, true, blob);
  }

  onKeyDown = e => {
    // escape
    if (e.keyCode !== 27) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this.onClose();
  }

  onClose = () => {
    const isTransfering = this.props.store.isTransfering();
    if (!isTransfering) {
      this.props.onClose();
    }

    if (isTransfering && window.confirm("Are you sure you want to cancel file transfers?")) {
      this.props.onClose();
    }
  }

  render() {
    const { store, onTransferUpdate, onTransferRemove } = this.props;
    if (!store.isOpen) {
      return null;
    }

    const { files, isUpload } = store;
    const latestFirst = files.toArray().reverse();
    return (
      <StyledFileTransfer onKeyDown={this.onKeyDown}>
        {!isUpload && <DownloadForm onDownload={this.onDownload} />}
        {isUpload && <UploadForm onUpload={this.onUpload} /> }
        <FileList
          onRemove={onTransferRemove}
          onUpdate={onTransferUpdate}
          files={latestFirst} />
        <div className="grv-file-transfer-footer">
          <CloseButton onClick={this.onClose} >
            <Icon.Close />
          </CloseButton>
        </div>
      </StyledFileTransfer>
    )
  }
}

export const FileList  = ({ files, onUpdate, onRemove }) => {
  if (files.length === 0) {
    return null;
  }

  const $files = files.map(file => {
    const key = file.id
    const props = {
      onUpdate,
      key,
      file,
      onRemove
    };

    return file.isUpload ?
      <FileToSend {...props}  /> :
      <FileToReceive {...props} />
  });

  return (
    <div className="m-t-sm">
      <TransferTable>
        <thead>
          <tr>
            <th className="is-left">File Path</th>
            <th className="is-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="100%">{$files}</td>
          </tr>
        </tbody>
      </TransferTable>
    </div>
  )
}


const StyledFileTransfer = styled.div`
  background: ${props => props.theme.colors.dark};
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .24);
  box-sizing: border-box;
  font-size: ${props => props.theme.fontSizes[0]}px;
  color: ${props => props.theme.colors.terminal};
  padding: 16px;
  position: relative;
  width: 496px;
`


const TransferTable = styled.table`
  font-size: ${props => props.theme.fontSizes[0]}px;
  width: 100%;

  .is-left {
    text-align: left;
  }

  .is-right {
    text-align: right;
  }

  thead {
    th {
      text-transform: uppercase;


    }
  }
`

const CloseButton = styled.button`
  background: ${props => props.theme.colors.dark};
  border: none;
  border-radius: 2px;
  font-size: ${props => props.theme.fontSizes[4]}px;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  height: 20px;
  outline: none;
  opacity: .56;
  padding: 0;
  position: absolute;
  right: 8px;
  top: 8px;
  transition: all .3s;
  width: 20px;
  z-index: 1;

  &:hover {
    background: ${props => props.theme.colors.error};
    opacity: 1;
  }
`