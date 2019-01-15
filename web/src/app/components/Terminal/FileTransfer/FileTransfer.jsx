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
import PropTypes from 'prop-types';
import { FileToReceive, FileToSend } from './File';
import DownloadForm from './DownloadForm';
import UploadForm from './UploadForm';
import { Text } from 'shared/components';

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
      <div className="grv-file-transfer p-sm" onKeyDown={this.onKeyDown}>
        {!isUpload && <DownloadForm onDownload={this.onDownload} />}
        {isUpload && <UploadForm onUpload={this.onUpload} /> }
        <FileList
          onRemove={onTransferRemove}
          onUpdate={onTransferUpdate}
          files={latestFirst} />
        <div className="grv-file-transfer-footer">
          <button onClick={this.onClose}
            className="btn btn-sm  grv-file-transfer-btn">
            Close
          </button>
        </div>
      </div>
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
      <div className="grv-file-transfer-header m-b-sm">
      </div>
      <div className="grv-file-transfer-file-list-cols">
        <Text> File </Text>
        <Text>Status </Text>
        <div> </div>
      </div>
      <div className="grv-file-transfer-content">
        <div className="grv-file-transfer-file-list">
          {$files}
        </div>
      </div>
    </div>
  )
}
