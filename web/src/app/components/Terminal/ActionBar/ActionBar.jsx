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
import PropTypes from 'prop-types'
import styled from 'styled-components';
import * as Icons from 'shared/components/Icon';
import { Flex } from 'shared/components';

export default class ActionBar extends React.Component {

  componentWillUnmount() {
    this.close();
  }

  close = () => {
    this.props.onClose && this.props.onClose();
  }

  render() {
    const {
      isFileTransferDialogOpen,
      onOpenUploadDialog,
      onOpenDownloadDialog,
      title
    } = this.props;

    return (
      <Flex height="30px">
        <div title="Close" onClick={this.close}>
          <Icons.Cross />
          {title}
        </div>
        <Flex>
          <IconButton
            title="Download files"
            isOpen={isFileTransferDialogOpen}
            onClick={onOpenDownloadDialog}>
            <Icons.ArrowDown />
          </IconButton>
          <IconButton
            title="Upload files"
            isOpen={isFileTransferDialogOpen}
            onClick={onOpenUploadDialog}>
            <Icons.ArrowUp />
          </IconButton>
        </Flex>
      </Flex>
    )
  }
}

ActionBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenDownloadDialog: PropTypes.func.isRequired,
  onOpenUploadDialog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const isOpen = props => {
  if (props.isOpen) {
    return {
      opacity: 0.5,
      cursor: "not-allowed"
    }
  }
}

const IconButton = styled.div`
  border-radius: 20px;
  width: 30px;
  height: 30px;
  color: white;
  display: flex;
  align-Items: center;
  justify-content: center;
  ${isOpen};
`