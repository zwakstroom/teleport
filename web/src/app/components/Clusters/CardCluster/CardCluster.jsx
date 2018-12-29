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
import { Box } from 'shared/components';
import * as Icons from 'shared/components/Icon/Icon';


export class CardCluster extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.name)
  }

  render() {
    const { name, status, connectedAt, ...rest } = this.props;
    const public_addr = public_addr || 'wolfe.gravitational.com';
    const version = version || '#.#.#';
    const props = {
      p: 4,
      ...rest,
      onClick: this.onClick,
    }

    console.log(this.props);

    return (
      <StyledCardCluster {...props}>
        <ClusterHeader>
          <h2>{name}</h2>
          <h3>{} NODES</h3>
        </ClusterHeader>


        <ClusterContent>
          <ClusterIcon>
            <Icons.Cluster />
          </ClusterIcon>
          <ul>
            <li><strong>STATUS: {status}</strong></li>
            <li>{public_addr}</li>
            <li>Teleport v{version}</li>
          </ul>
        </ClusterContent>

        <ClusterFooter>{connectedAt}</ClusterFooter>
      </StyledCardCluster>
    );
  }
}



const StyledCardCluster = styled(Box)`
  background: ${props => props.theme.background.secondary };
  box-shadow: 0 8px 32px rgba(0, 0, 0, .24);
  cursor: pointer;
  width: 408px;
  padding: 0;
  transition: all .3s;

  &:hover {
    box-shadow: 0 24px 64px rgba(0, 0, 0, .56);
  }
`

const ClusterHeader = styled.header`
  background: ${props => props.theme.background.tertiary };
  border-radius: 4px;
  padding: 16px 16px 8px 16px;
  transition: all .3s;

  h2 {
    font-size: 12px;
    line-height: 16px;
    margin: 0;
    text-transform: uppercase;
  }

  h3 {
    font-size: 10px;
    line-height: 16px;
    margin: 0;
    opacity: .56;
    text-transform: uppercase;
  }
`


const ClusterIcon = styled.div`
  background: ${props => props.theme.background.quaternary };
  border-radius: 4px;
  box-sizing: border-box;
  float: left;
  height: 72px;
  margin: 0 16px 0 0;
  padding: 16px;
  text-align: center;
  width: 72px;

  .icon {
    font-size: 40px;
    display: block;
    line-height: 40px;
    margin: 0 auto;
  }

`

const ClusterContent = styled.div`
  border-radius: 4px;
  padding: 40px;

  ul {
    font-size: 12px;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      color: ${props => props.theme.colors.subtle };
      line-height: 24px;
      margin: 0;
    }

    strong {
      font-weight: bold;
      color: ${props => props.theme.colors.light };
      text-transform: uppercase;
    }
  }
`
const ClusterFooter = styled.footer`
  background: ${props => props.theme.background.quaternary };
  box-sizing: border-box;
  clear: both;
  font-size: 12px;
  height: 48px;
  line-height: 48px;
  opacity: .56;
  margin: 0;
  padding: 0 16px;
`


export default CardCluster;
