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
import styled from 'styled-components';
import * as Icons from 'shared/components/Icon';
import { connect } from 'app/components/nuclear';
import { withRouter } from 'react-router';
import { getters as ftGetters } from 'app/flux/fileTransfer';
import * as ftActions from 'app/flux/fileTransfer/actions';
import { Flex } from 'shared/components';

class ActionBar extends React.Component {

  componentWillUnmount() {
    ftActions.closeDialog()
  }

  openFileTransferDialog = isUpload => {
    const { store, params } = this.props;
    // disable actions if file transfer dialog is open
    if (store.isOpen) {
      return;
    }

    if (isUpload) {
      ftActions.openUploadDialog(params);
    } else {
      ftActions.openDownloadDialog(params);
    }
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
    const { store, title } = this.props;
    const { isOpen } = store;


    return (
      <Flex height="30px">
        <div title="Close" onClick={this.close}>
          <Icons.Cross />
          {title}
        </div>
        <Flex>
          <IconButton
            title="Download files"
            isOpen={isOpen}
            onClick={this.openDownloadDialog}>
            <Icons.ArrowDown />
          </IconButton>
          <IconButton
            title="Upload files"
            isOpen={isOpen}
            onClick={this.openUploadDialog}>
            <Icons.ArrowUp />
          </IconButton>
        </Flex>
      </Flex>
    )
  }
}

const isOpen = props => {
  if (props.isOpen) {
    return {
      opacity: 0.5,
      cursor: "not-allowed"
    }
  }
}

const IconButton = styled.div`
  width: 30px;
  height: 32p;
  color: white;
  display: flex;
  align-Items: center;
  justify-content: center;
  ${isOpen};
`

function mapStateToProps() {
  return {
    store: ftGetters.store,
  }
}

export default connect(mapStateToProps)(withRouter(ActionBar));



