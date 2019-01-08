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

export const AppError = ({ category, err, message }) => {
  let content = null;

  switch (category) {
    case AppErrorEnum.FAILED_TO_LOGIN:
      content = <LoginFailed err={err} message={message} />; break;
    case AppErrorEnum.NOT_FOUND:
      content = <NotFound  err={err} />; break;
    case AppErrorEnum.ACCESS_DENIED:
      content = <AccessDenied err={err} message={message} />; break;
    default:
      content = <Failed err={err} message={message} />;
  }

  return (
    <div>
      <Logo src={logoSvg}/>
      {content}
    </div>
  );
};

export default withDocTitle("Error", ({ match }) => {
  const { category, err } = match.params;
  const message = getUrlParameter('details');
  return (
    <AppError category={category} err={err} message={message} />
  )
});