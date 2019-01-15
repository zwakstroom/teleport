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
import classnames from 'classnames';
import { Text } from 'shared/components';
import { Uploader, Downloader } from 'app/services/fileTransfer';
import withHttpRequest from './withHttpRequest';

export default class File extends Component {

  static propTypes = {
    file: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    httpResponse: PropTypes.object
  }

  savedToDisk = false;

  onRemove = () => {
    this.props.onRemove();
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
    const {
      name,
      isFailed,
      isProcessing,
      isCompleted,
      error,
    } = this.props.file;

    const { httpProgress } = this.props;

    const className = classnames(
      "grv-file-transfer-file-list-item",
      isFailed && "--failed",
      isProcessing && "--processing",
      isCompleted && "--completed",
    )

    return (
      <div className={className}>
        <div className="grv-file-transfer-file-path">
          {name}
          {isFailed && <div> {error} </div> }
        </div>
        <div className="grv-file-transfer-file-status">
          {isFailed &&
            <div>
              failed
            </div>
          }
          {isProcessing &&
            <div>
              {httpProgress}%
            </div>
          }
          {isCompleted &&
            <Text>completed</Text>
          }
        </div>
        {isProcessing &&
          <div className="grv-file-transfer-file-close">
            <a onClick={this.onRemove}>
              cancel
            </a>
          </div>
        }
      </div>
    )
  }
}

const FileToSend = withHttpRequest(Uploader)(File);
const FileToReceive = withHttpRequest(Downloader)(File);

export {
  FileToReceive,
  FileToSend
}