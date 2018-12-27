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

import reactor from 'app/reactor';
import auth from 'app/services/auth';
import history from 'app/services/history';
import session from 'app/services/session';
import cfg from 'app/config';
import api from 'app/services/api';
import Logger from 'app/lib/logger';
import * as status from './../status/actions';
import { RECEIVE_INVITE } from './actionTypes';

const logger = Logger.create('flux/user/actions');

export function fetchInvite(inviteToken) {
  const path = cfg.api.getInviteUrl(inviteToken);
  status.fetchInviteStatus.start();
  return api.get(path).then(invite => {
    status.fetchInviteStatus.success();
    reactor.dispatch(RECEIVE_INVITE, invite);
  })
  .catch(err => {
    status.fetchInviteStatus.fail(err.message);
  });
}

export function acceptInvite(name, psw, token, inviteToken){
  const promise = auth.acceptInvite(name, psw, token, inviteToken);
  return _handleAcceptInvitePromise(promise);
}

export function acceptInviteWithU2f(name, psw, inviteToken) {
  const promise = auth.acceptInviteWithU2f(name, psw, inviteToken);
  return _handleAcceptInvitePromise(promise);
}

export function loginWithSso(providerName, providerUrl) {
  const entryUrl = _getEntryRoute();
  history.push(cfg.api.getSsoUrl(providerUrl, providerName, entryUrl), true);
}

export function loginWithU2f(user, password) {
  const promise = auth.loginWithU2f(user, password);
  return _handleLoginPromise(promise);
}

export function login(user, password, token) {
  const promise = auth.login(user, password, token);
  return _handleLoginPromise(promise);
}

export function logout() {
  session.logout();
}

function _handleAcceptInvitePromise(promise) {
  status.signupStatus.start();
  return promise
    .then(() => {
      history.push(cfg.routes.app, true);
    })
    .catch(err => {
      logger.error('accept invite', err);
      status.signupStatus.fail(err.message);
    })
}

function _handleLoginPromise(promise) {
  status.loginStatus.start();
  return promise
    .then(() => {
      const url = _getEntryRoute();
      history.push(url, true);
    })
    .catch(err => {
      logger.error('login', err);
      status.loginStatus.fail(err.message);
    })
}

function _getEntryRoute() {
  let entryUrl = history.getRedirectParam();
  if (entryUrl) {
    entryUrl = history.ensureSafeRoute(entryUrl);
  } else {
    entryUrl = cfg.routes.app;
  }

  return history.ensureBaseUrl(entryUrl);
}
