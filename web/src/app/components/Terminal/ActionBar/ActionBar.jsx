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

  openUploadDialog = () => {
    this.openFileTransferDialog(true);
  }

  openDownloadDialog = () => {
    this.openFileTransferDialog(false);
  }

  renderTab() {

  }

  render() {
    const {
      isFileTransferDialogOpen,
      onOpenUploadDialog,
      onOpenDownloadDialog,
      title
    } = this.props;

    return (
      <Flex height="32px" mt={1}>
        <StyledTab title={title}>
          <button title="Close" onClick={this.close}>
            <Icons.Close />
          </button>
          {title}
        </StyledTab>
        <Flex>
          <IconButton
            title="Download files"
            isOpen={isFileTransferDialogOpen}
            onClick={onOpenDownloadDialog}>
            <Icons.Upload />
          </IconButton>
          <IconButton
            title="Upload files"
            isOpen={isFileTransferDialogOpen}
            onClick={onOpenUploadDialog}>
            <Icons.Download />
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
      opacity: 0.24,
      cursor: "not-allowed"
    }
  }
}


const StyledTab = styled.div`
  box-sizing: border-box;
  font-size: ${props => props.theme.fontSizes[1]}px;
  height: 32px;
  line-height: 16px;
  padding: 8px 16px 8px 40px;
  position: relative;

  button {
    background: ${props => props.theme.colors.errorDark};
    border: none;
    border-radius: 2px;
    cursor: pointer;
    height: 16px;
    outline: none;
    padding: 0;
    position: absolute;
    top: 8px;
    transition: all .3s;
    left: 16px;
    width: 16px;
    z-index: 1;

    &:hover {
      background: ${props => props.theme.colors.error};
    }
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  border-radius: 2px;  width: 24px;
  height: 32px;
  color: ${props => props.theme.colors.light};
  cursor: pointer;
  font-size:  ${props => props.theme.fontSizes[4]}px;
  display: flex;
  opacity: .87;
  outline: none;
  align-items: center;
  justify-content: center;
  ${isOpen};
`