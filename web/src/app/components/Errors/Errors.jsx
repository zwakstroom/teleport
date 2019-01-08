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
import Typography from 'shared/components/Typography';

const MSG_ERROR_LOGIN_FAILED = 'Login unsuccessful';
const MSG_ERROR_DEFAULT = 'Internal Error';
const MSG_ERROR_NOT_FOUND = '404 Not Found';
const MSG_ERROR_NOT_FOUND_DETAILS = `Looks like the page you are looking for isn't here any longer.`;
const MSG_ERROR_ACCESS_DENIED = 'Access denied';

const Details = ({err='', message=''}) => {
  const details = message ? <p>{message}</p> : null;
  const errMessage = err ? <Danger mt={4}>{err}</Danger> : null;

  return (
    <div>
      {errMessage} {details}
      <p>
        If you believe this is an issue with Teleport,
        please <a href="https://github.com/gravitational/teleport/issues/new">create a GitHub issue.</a>
      </p>
    </div>
  );
}

const NotFound = ({err}) => (
  <Card>
    <Typography.h1 mb={4} textAlign="center">{MSG_ERROR_NOT_FOUND}</Typography.h1>
    <Details err={err} message={MSG_ERROR_NOT_FOUND_DETAILS}/>
  </Card>
)

const AccessDenied = ({err, message}) => (
  <Card>
    <Typography.h1 mb={4} textAlign="center">{MSG_ERROR_ACCESS_DENIED}</Typography.h1>
    <Details err={err} message={message}/>
  </Card>
)

const Failed = ({err, message}) => (
  <Card>
    <Typography.h1 mb={4} textAlign="center">{MSG_ERROR_DEFAULT}</Typography.h1>
    <Details err={err} message={message}/>
  </Card>
)

const LoginFailed = ({err, message }) => (
  <Card>
    <Typography.h1 mb={4} textAlign="center">{MSG_ERROR_LOGIN_FAILED}</Typography.h1>
    <Details err={err} message={message}/>
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


  p {
    line-height: 32px;
  }
`

