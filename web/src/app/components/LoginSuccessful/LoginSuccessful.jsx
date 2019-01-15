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
import Typography from 'shared/components/Typography';
import Logo from 'shared/components/Logo';
import logoSvg from 'shared/assets/images/teleport-medallion.svg';
import Button from 'shared/components/Button';
import * as Icon from 'shared/components/Icon';
import { withDocTitle } from './../DocumentTitle';


export const LoginSuccessful = () => (
  <div>
    <Logo src={logoSvg}/>

    <StyledLoginSuccessful>
      <Icon.CircleCheck mb={3} fontSize={64} color={colors.success}/>
      <Typography.h2 m={0}>Login Successful</Typography.h2>
      <Typography.p>
        You have successfully signed into your account.
        You can close this window and continue using the product.
        </Typography.p>
      <Button secondary>Close Window</Button>
    </StyledLoginSuccessful>
  </div>
)

export default withDocTitle("Success", LoginSuccessful)


const StyledLoginSuccessful = styled.div`
  background-color: ${colors.bgSecondary};
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 0 32px rgba(0, 0, 0, .12), 0 8px 32px rgba(0, 0, 0, .24);
  color: ${colors.light};
  margin: 32px auto;
  padding: 40px;
  text-align: center;
  width: 540px;

  p {
    line-height: 32px;
  }
`