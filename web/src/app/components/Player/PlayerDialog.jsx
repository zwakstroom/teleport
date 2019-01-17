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
import { fonts } from 'shared/components/theme';
import Portal from 'shared/components/Modal/Portal';
import { close } from 'app/flux/player/actions';
import Player from './Player';
import DocumentTitle from './../DocumentTitle';
import { Close } from 'shared/components/Icon';
import cfg from 'app/config';

class PlayerDialog extends React.Component {

  constructor(props) {
    super(props);
    const { sid, siteId } = props.match.params;
    this.url = cfg.api.getFetchSessionUrl({ siteId, sid });
  }

  onClose = () => {
    const { siteId } = this.props.match.params;
    close(siteId)
  }

  render() {
    const { siteId } = this.props.match.params;
    const title = `${siteId} · Player`;
    return (
      <Portal>
        <DocumentTitle title={title}>
          <StyledBox>
            <CloseButton>
              <Close onClick={this.onClose}/>
            </CloseButton>
            <Player url={this.url}/>
          </StyledBox>
        </DocumentTitle>
      </Portal>
    );
  }
}

const CloseButton = styled.button`
  background: ${props => props.theme.colors.errorDark};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  height: 16px;
  outline: none;
  padding: 0;
  position: absolute;
  top: 16px;
  transition: all .3s;
  left: 16px;
  width: 16px;
  z-index: 1;

  &:hover {
    background: ${props => props.theme.colors.error};
  }
`

const StyledBox = styled.div`
  background-color: ${props => props.theme.colors.bgTerminal};
  left: 0;
  padding: 32px 16px 16px 16px;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
`

export default PlayerDialog;