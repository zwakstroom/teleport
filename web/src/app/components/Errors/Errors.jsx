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

const MSG_ERROR_LOGIN_FAILED = 'Login unsuccessful. Please try again, if the problem persists, contact your system administrator.';
const MSG_ERROR_DEFAULT = 'Internal Error';
const MSG_ERROR_NOT_FOUND = '404 Not Found';
const MSG_ERROR_NOT_FOUND_DETAILS = `Looks like the page you are looking for isn't here any longer.`;
const MSG_ERROR_ACCESS_DENIED = 'Access denied';

const Details = ({ message='' }) => (
  <div>
    <small>{message}</small>
    <p>
      <small>If you believe this is an issue with Teleport, please <a href="https://github.com/gravitational/teleport/issues/new">create a GitHub issue.</a></small>
    </p>
  </div>
)

const NotFound = () => (
  <Box>
    <h1>{MSG_ERROR_NOT_FOUND}</h1>
    <Details message={MSG_ERROR_NOT_FOUND_DETAILS}/>
  </Box>
)

const AccessDenied = ({message}) => (
  <Box>
    <h1>{MSG_ERROR_ACCESS_DENIED}</h1>
    <Details message={message}/>
  </Box>
)

const Failed = ({message}) => (
  <Box>
    <h1>{MSG_ERROR_DEFAULT}</h1>
    <Details message={message}/>
  </Box>
)

const LoginFailed = ({ message }) => (
  <Box>
    <h1>{MSG_ERROR_LOGIN_FAILED}</h1>
    <Details message={message}/>
  </Box>
)

export {
  NotFound,
  Failed,
  AccessDenied,
  LoginFailed
};

const Box = styled.div`
  margin: 0 auto;
`
