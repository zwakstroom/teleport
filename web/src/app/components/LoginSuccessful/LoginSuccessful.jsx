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
import { withDocTitle } from './../documentTitle';

const MSG_INFO_LOGIN_SUCCESS = 'Login was successful, you can close this window and continue using tsh.';

export const LoginSuccessful = () => (
  <StyledLoginSuccessful>
    <h1>{MSG_INFO_LOGIN_SUCCESS}</h1>
  </StyledLoginSuccessful>
)

export default withDocTitle("Success", LoginSuccessful)

const StyledLoginSuccessful = styled.div`
  margin: 0 auto;
`