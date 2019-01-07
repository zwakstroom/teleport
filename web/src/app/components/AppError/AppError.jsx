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
import { getUrlParameter } from 'app/services/browser';
import { withDocTitle } from './../documentTitle';
import Logo from 'shared/components/Logo';
import logoSvg from 'shared/assets/images/teleport-medallion.svg';

import {
  NotFound,
  Failed,
  AccessDenied,
  LoginFailed
} from './../Errors'

export const AppErrorEnum = {
  FAILED_TO_LOGIN: 'login_failed',
  NOT_FOUND: 'not_found',
  ACCESS_DENIED: 'access_denied'
};

export const AppError = ({ type, message }) => {
  let err = null;

  switch (type) {
    case AppErrorEnum.FAILED_TO_LOGIN:
      err = <LoginFailed message={message} />; break;
    case AppErrorEnum.NOT_FOUND:
      err = <NotFound />; break;
    case AppErrorEnum.ACCESS_DENIED:
      err = <AccessDenied message={message} />; break;
    default:
      err = <Failed message={message} />;
  }

  return (
    <div>
      <Logo src={logoSvg}/>
      {err}
    </div>
  );
};

export default withDocTitle("Error", ({ match }) => {
  const { type } = match.params;
  const message = getUrlParameter('details');
  return (
    <AppError type={type} message={message} />
  )
});