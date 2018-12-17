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

export class CardCluster extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.name)
  }

  render() {
    const { name, status, connectedAt, ...rest } = this.props;
    const props = {
      p: 4,
      bg: "secondaryLight",
      ...rest,
      onClick: this.onClick,
    }

    return (
      <StyledCardCluster {...props}>
        <div> Name: {name} </div>
        <div> Status: {status} </div>
        <div> Joined: {connectedAt} </div>
      </StyledCardCluster>
    );
  }
}

const StyledCardCluster = styled(Box)`
  &:hover {
    background:  ${props => props.theme.background.primary};
    cursor: pointer;
  }
`

export default CardCluster;
