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
import styled from 'styled-components'
import {colors} from 'shared/components/theme';
import {Danger} from 'shared/components/Alerts';

const MSG_ERROR_LOGIN_FAILED = 'Login unsuccessful. Please try again, if the problem persists, contact your system administrator.';
const MSG_ERROR_DEFAULT = 'Internal Error';
const MSG_ERROR_NOT_FOUND = '404 Not Found';
const MSG_ERROR_NOT_FOUND_DETAILS = `Looks like the page you are looking for isn't here any longer.`;
const MSG_ERROR_ACCESS_DENIED = 'Access denied';

const Details = ({ message='' }) => (
  <div>
    <Danger mt={4}>{message}</Danger>
    <p>
      If you believe this is an issue with Teleport,
      please <a href="https://github.com/gravitational/teleport/issues/new">create a GitHub issue.</a>
    </p>
  </div>
)

const NotFound = () => (
  <Card>
    <h1>{MSG_ERROR_NOT_FOUND}</h1>
    <Details message={MSG_ERROR_NOT_FOUND_DETAILS}/>
  </Card>
)

const AccessDenied = ({message}) => (
  <Card>
    <h1>{MSG_ERROR_ACCESS_DENIED}</h1>
    <Details message={message}/>
  </Card>
)

const Failed = ({message}) => (
  <Card>
    <h1>{MSG_ERROR_DEFAULT}</h1>
    <Details message={message}/>
  </Card>
)

const LoginFailed = ({ message }) => (
  <Card>
    <h1>{MSG_ERROR_LOGIN_FAILED}</h1>
    <Details message={message}/>
  </Card>
)

export {
  NotFound,
  Failed,
  AccessDenied,
  LoginFailed
};

const Card = styled.div`
  background-color: ${colors.bgLight};
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 0 32px rgba(0, 0, 0, .12), 0 8px 32px rgba(0, 0, 0, .24);
  color: ${colors.text};
  margin: 32px auto;
  padding: 40px;
  width: 540px;

  h1 {
    color: ${colors.text};
    font-size: 20px;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }

  p {
    line-height: 32px;
  }
`

