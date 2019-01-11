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
import { FileTransferDialog } from './../files';
import Portal from 'shared/components/Modal/Portal';
import Alert from 'shared/components/Alerts';
import { fonts } from 'shared/components/theme';

class Terminal extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    setTimeout(() => terminalActions.initTerminal(this.props.term), 0);
  }

  startNew = () => {
    const newTermParams = {
      ...this.props.term,
      sid: undefined
    }

    terminalActions.updateRoute(newTermParams);
    terminalActions.initTerminal(newTermParams);
  }

  replay = () => {
    const { siteId, sid } = this.props.term;
    playerActions.open(siteId, sid);
  }

  onCloseFileTransfer = () => {
    fileActions.closeDialog();
    if (this.termRef) {
      this.termRef.focus();
    }
  }

  onClose = () => {
    this.props.onClose(this.props.term.siteId);
  }

  render() {
    const { termStore, fileStore } = this.props;
    const { status } = termStore;
    const title = termStore.getServerLabel();

    let $content = null;

    if (status.isLoading) {
      $content = (<Indicator type="bounce" />);
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

    return (
      <Portal>
        <StyledTerminal>
          <FileTransferDialog
            store={fileStore}
            onClose={this.onCloseFileTransfer}
            onTransfer={fileActions.addFile}
          />
          <Flex flexDirection="column" height="100%" width="100%">
            <ActionBar title={title} onClose={this.onClose} />
              {$content}
          </Flex>
        </StyledTerminal>
      </Portal>
    );
  }
}

const ErrorIndicator = ({ text }) => (
  <Alert status="danger">
    Connection error
    <Text fontSize={1}> {text} </Text>
  </Alert>
)

const SidNotFoundError = ({ onNew, onReplay }) => (
  <Alert status="danger">
    <strong>The session is no longer active</strong>
    <Box mt={2}>
      <Button onClick={onNew} mr={2}>
        Start New
      </Button>
      <Button onClick={onReplay}>
        Replay
      </Button>
    </Box>
  </Alert>
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
    onClose: terminalActions.close,
    term: {
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
    font-family: ${ fonts.mono };
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
`
