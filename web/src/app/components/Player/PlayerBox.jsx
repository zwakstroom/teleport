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
import { close } from 'app/flux/player/actions';
import Player from './Player';
import DocumentTitle from './../DocumentTitle';
import { Cross as CloseIcon } from 'shared/components/Icon';
import cfg from 'app/config';

class PlayerHost extends React.Component {

  constructor(props) {
    super(props);
    const { sid, siteId } = props.match.params;
    this.url = cfg.api.getFetchSessionUrl({ siteId, sid });
  }

  onClose = clusterId => {
    close(clusterId)
  }

  render() {
    const { siteId } = this.props.match.params;
    const title = `${siteId} · Player`;
    return (
      <DocumentTitle title={title}>
        <StyledBox>
          <CloseIcon onClick={this.onClose}/>
          <Player url={this.url}/>
        </StyledBox>
      </DocumentTitle>
    );
  }
}

const StyledBox = styled.div`
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

export default PlayerHost;