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
import { connect } from './../nuclear';
import termGetters from 'app/flux/terminal/getters';
import { getters as fileGetters } from 'app/flux/fileTransfer';
import * as terminalActions  from 'app/flux/terminal/actions';
import * as playerActions from 'app/flux/player/actions';
import * as fileActions from 'app/flux/fileTransfer/actions';
import ActionBar from './ActionBar/ActionBar';
import { Indicator, Flex, Text, Button, Box } from 'shared/components';
import Xterm from './Xterm/Xterm';
import FileTransferDialog from './FileTransfer';
import Portal from 'shared/components/Modal/Portal';
import * as Alerts from 'shared/components/Alerts';
import { fonts } from 'shared/components/theme';

export class Terminal extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    setTimeout(() => this.props.initTerminal(this.props.termParams), 0);
  }

  startNew = () => {
    const newTermParams = {
      ...this.props.termParams,
      sid: undefined
    }

    this.props.updateRoute(newTermParams);
    this.props.initTerminal(newTermParams);
  }

  replay = () => {
    const { siteId, sid } = this.props.termParams;
    this.props.onOpenPlayer(siteId, sid);
  }

  onCloseFileTransfer = () => {
    this.props.onCloseFileTransfer();
    if (this.termRef) {
      this.termRef.focus();
    }
  }

  onOpenUploadDialog = () => {
    this.props.onOpenUploadDialog(this.props.termParams);
  }

  onOpenDownloadDialog = () => {
    this.props.onOpenDownloadDialog(this.props.termParams);
  }

  onTransferStart = json => {
    this.props.onTransferStart(json);
  }

  onClose = () => {
    this.props.onClose(this.props.termParams.siteId);
  }

  render() {
    const { termStore, fileStore } = this.props;
    const { status } = termStore;
    const title = termStore.getServerLabel();

    let $content = null;

    if (status.isLoading) {
      $content = (<Indicator />);
    }

    if (status.isError) {
      $content = (<ErrorIndicator text={status.errorText} />);
    }

    if (status.isNotFound) {
      $content = (
        <SidNotFoundError
          onReplay={this.replay}
          onNew={this.startNew} />);
    }

    if (status.isReady) {
      const ttyParams = termStore.getTtyParams();
      $content = (
        <Xterm ref={e => this.termRef = e}
          title={title}
          onSessionEnd={this.onClose}
          ttyParams={ttyParams} />
      );
    }

    const isFileTransferDialogOpen = fileStore.isOpen;

    return (
      <Portal>
        <StyledTerminal>
          <FileTransferDialog
            store={fileStore}
            onClose={this.onCloseFileTransfer}
            onTransfer={this.onTransferStart}
          />
          <Flex flexDirection="column" height="100%" width="100%">
            <ActionBar
              onOpenUploadDialog={this.onOpenUploadDialog}
              onOpenDownloadDialog={this.onOpenDownloadDialog}
              isOpen={isFileTransferDialogOpen}
              title={title}
              onClose={this.onClose} />
              {$content}
          </Flex>
        </StyledTerminal>
      </Portal>
    );
  }
}

const ErrorIndicator = ({ text }) => (
  <Alerts.Danger>
    Connection error
    <Text fontSize={1}> {text} </Text>
  </Alerts.Danger>
)

const SidNotFoundError = ({ onNew, onReplay }) => (
  <Alerts.Danger>
    <strong>The session is no longer active</strong>
    <Box mt={2}>
      <Button onClick={onNew} mr={2}>
        Start New
      </Button>
      <Button onClick={onReplay}>
        Replay
      </Button>
    </Box>
  </Alerts.Danger>
)

function mapStoreToProps() {
  return {
    termStore: termGetters.store,
    fileStore: fileGetters.store
  }
}

function mapStateToProps(props) {
  const { sid, login, siteId, serverId } = props.match.params;
  return {
    onOpenUploadDialog: fileActions.openUploadDialog,
    onOpenDownloadDialog: fileActions.openDownloadDialog,
    onTransferStart: fileActions.addFile,
    onCloseFileTransfer: fileActions.closeDialog,
    onClose: terminalActions.close,
    onOpenPlayer: playerActions.open,
    updateRoute: terminalActions.updateRoute,
    initTerminal: terminalActions.initTerminal,
    termParams: {
      sid,
      login,
      siteId,
      serverId,
    }
  }
}


export default connect(mapStoreToProps, mapStateToProps)(Terminal);

const StyledTerminal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  background-color:${props => props.theme.colors.bgTerminal};

  .grv-terminal {
    height: 100%;
    width: 100%;
    font-size: 14px;
    line-height: normal
  }

  .grv-terminal .terminal {
    font-family: ${ fonts.mono};
    border: none;
    font-size: inherit;
    line-height: normal;
    position: relative;
  }

  .grv-terminal .terminal .xterm-viewport {
    overflow-y: hidden;
    background-color: #252323;
  }

  .grv-terminal .terminal * {
    font-weight: normal!important;
  }
`;