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

import {Box, Button, Flex, Card} from 'shared/components/';
import Alert from 'shared/components/Alerts';


export default class UpgradePage extends React.Component {
  render() {
    return (
      <div>
        <Header>
          <h1>Roles</h1>

        </Header>

        <Alert status="info">
          Please <a href="">upgrade to Teleport Enterprise</a> to use this feature
        </Alert>

        <Details>
          <Box width="50%">
            <h2>Role Based Access Controls</h2>
            <p>
              Roles are used to create Role Based Access Controls
               (RBAC) and they are only available in the
                Teleport Enterprise offering.
            </p>

            <p>
              Roles allow Teleport administrators can create
               more granular access and action permissions and
               map those Roles to specific identities or users
               of Teleport. Administrators can create rules like:
               "admins can do anything, developers must never touch
               production servers and interns can only SSH
               into staging servers as guests".
            </p>

            [Nasdaq, Ticketmaster, Samsung, Snowflake logos]

            <p>
              Roles are being used at companies like Nasdaq,
              Ticketmaster, Samsung and Snowflake to secure
              their infrastructure, meet compliance requirements
               and reduce the operational overhead of infrastructure access management.
            </p>

            <Button size="large" primary>Upgrade to Teleport Enterprise</Button>
          </Box>

          <Box>
            sadasd
          </Box>
        </Details>
      </div>

    );
  }
}


const Details = styled(Flex)`
  background:  ${props => props.theme.colors.light};
  border-radius: 4px;
  color:  ${props => props.theme.colors.text};
  padding: 32px;
`

const Header = styled.header`
  height: 40px;
  margin: 40px 0;

  &::after {
    content: "";
    clear: both;
    display: table;
  }

  h1 {
    font-size: 36px;
    font-weight: 300;
    float: left;
    line-height: 40px;
    margin: 0 40px 0 0;
  }
`;