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

import React from 'react';
import styled from 'styled-components'
import { Button } from '../../../../shared/components';

const pickSso = type => {
  switch (type) {
    case 'microsoft':
      return { color: '#2672ec', className: 'fa fa-windows' };
    case 'github':
      return { color: '#444444', className: 'fa fa-github' };
    case 'bitbucket':
      return { color: '#205081', className: 'fa fa-bitbucket' };
    case 'google':
      return { color: '#dd4b39', className: 'fa fa-google' };
    case 'btn-openid':
      return { color: '#f7931e', className: 'fa fa-openid' };
    default:
    return { color: '#f7931e' };
  }
}

const SsoButton = props => {
  const iconClass = pickSso(props.type).className;
  return (
    <Button block size="large" {...props} color="light">
      { iconClass &&
        <Icon>
          <span className={iconClass} />
        </Icon>
      }
      {props.children}
    </Button>
  )
}

export const StyledSsoButton = styled(SsoButton)`
  background-color: ${ props => pickSso(props.type).color};
  position: relative;
  box-sizing: border-box;
  margin: 32px 0 0 0;
`

const Icon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 32px;
  font-size: 1.6em;
  text-align: center;
  border-right: 1px solid rgba(0,0,0,.2);
`

export default StyledSsoButton;