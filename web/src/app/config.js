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

import { generatePath } from "react-router";
import { merge } from 'lodash';
import { isTestEnv } from './services/utils'

const baseUrl = isTestEnv() ? 'localhost' : window.location.origin;

const cfg = {

  baseUrl,

  helpUrl: 'https://gravitational.com/teleport/docs/quickstart/',

  maxSessionLoadSize: 50,

  displayDateFormat: 'MM/DD/YYYY HH:mm:ss',

  auth: {
  },

  canJoinSessions: true,

  routes: {
    app: '/web',
    login: '/web/login',
    nodes: '/web/nodes',
    cluster: '/web/cluster/:clusterId',
    clusterNodes: '/web/cluster/:clusterId',
    clusterSessions: '/web/cluster/:clusterId/sessions',
    currentSession: '/web/cluster/:siteId/sessions/:sid',
    sessions: '/web/sessions',
    newUser: '/web/newuser/:inviteToken',
    error: '/web/msg/error/:type?',
    successfulLogin: '/web/msg/info/login_success',
    terminal: '/web/cluster/:siteId/node/:serverId/:login/:sid?',
    player: '/web/cluster/:siteId/player/sid/:sid',
    webApi: '/v1/webapi/*',
    settingsBase: '/web/settings',
    settingsAccount: '/web/settings/account',
  },

  api: {
    scp: '/v1/webapi/sites/:siteId/nodes/:serverId/:login/scp?location=:location&filename=:filename',
    ssoOidc: '/v1/webapi/oidc/login/web?redirect_url=:redirect&connector_id=:providerName',
    ssoSaml: '/v1/webapi/saml/sso?redirect_url=:redirect&connector_id=:providerName',
    renewTokenPath:'/v1/webapi/sessions/renew',
    sessionPath: '/v1/webapi/sessions',
    userContextPath: '/v1/webapi/user/context',
    userStatusPath: '/v1/webapi/user/status',
    invitePath: '/v1/webapi/users/invites/:inviteToken',
    createUserPath: '/v1/webapi/users',
    changeUserPasswordPath: '/v1/webapi/users/password',
    u2fCreateUserChallengePath: '/v1/webapi/u2f/signuptokens/:inviteToken',
    u2fCreateUserPath: '/v1/webapi/u2f/users',
    u2fSessionChallengePath: '/v1/webapi/u2f/signrequest',
    u2fChangePassChallengePath: '/v1/webapi/u2f/password/changerequest',
    u2fChangePassPath: '/v1/webapi/u2f/password',
    u2fSessionPath: '/v1/webapi/u2f/sessions',
    sitesBasePath: '/v1/webapi/sites',
    sitePath: '/v1/webapi/sites/:siteId',
    nodesPath: '/v1/webapi/sites/:siteId/nodes',
    siteSessionPath: '/v1/webapi/sites/:siteId/sessions',
    sessionEventsPath: '/v1/webapi/sites/:siteId/sessions/:sid/events',
    siteEventSessionFilterPath: `/v1/webapi/sites/:siteId/sessions`,
    siteEventsFilterPath: `/v1/webapi/sites/:siteId/events?event=session.start&event=session.end&from=:start&to=:end`,
    ttyWsAddr: ':fqdm/v1/webapi/sites/:cluster/connect?access_token=:token&params=:params',

    getSiteUrl(siteId) {
      return generatePath(cfg.api.sitePath, { siteId });
    },

    getSiteNodesUrl(siteId='-current-') {
      return generatePath(cfg.api.nodesPath, { siteId });
    },

    getSiteSessionUrl(siteId='-current-') {
      return generatePath(cfg.api.siteSessionPath, { siteId });
    },

    getSsoUrl(providerUrl, providerName, redirect) {
      return cfg.baseUrl + generatePath(providerUrl, { redirect, providerName });
    },

    getSiteEventsFilterUrl({start, end, siteId}){
      return generatePath(cfg.api.siteEventsFilterPath, {start, end, siteId});
    },

    getSessionEventsUrl({sid, siteId}){
      return generatePath(cfg.api.sessionEventsPath, {sid, siteId});
    },

    getScpUrl({ siteId, serverId, login, location, filename }) {
      return generatePath(cfg.api.scp, {siteId, serverId, login, location, filename});
    },

    getFetchSessionsUrl(siteId){
      return generatePath(cfg.api.siteEventSessionFilterPath, {siteId});
    },

    getFetchSessionUrl({sid, siteId}){
      return generatePath(cfg.api.siteSessionPath+'/:sid', {sid, siteId});
    },

    getInviteUrl(inviteToken){
      return generatePath(cfg.api.invitePath, {inviteToken});
    },

    getU2fCreateUserChallengeUrl(inviteToken){
      return generatePath(cfg.api.u2fCreateUserChallengePath, {inviteToken});
    }
  },

  getPlayerUrl({siteId, sid}) {
    return generatePath(cfg.routes.player, { siteId, sid });
  },

  getTerminalLoginUrl({siteId, serverId, login, sid}) {
    return generatePath(cfg.routes.terminal, { siteId, serverId, login, sid });
  },

  getCurrentSessionRouteUrl({sid, siteId}){
    return generatePath(cfg.routes.currentSession, {sid, siteId});
  },

  getAuthProviders() {
    return cfg.auth && cfg.auth.providers ? cfg.auth.providers : [];
  },

  getAuth2faType() {
    return cfg.auth ? cfg.auth.second_factor : null;
  },

  getU2fAppId(){
    return cfg.auth && cfg.auth.u2f ? cfg.auth.u2f.app_id : null;
  },

  getWsHostName(){
    const prefix = location.protocol === 'https:' ? 'wss://' : 'ws://';
    const hostport = location.hostname+(location.port ? ':'+location.port: '');
    return `${prefix}${hostport}`;
  },

  init(newConfig = {}) {
    merge(this, newConfig);
  },

  getClusterUrl(clusterId) {
    return generatePath(cfg.routes.cluster, { clusterId });
  },

  getClusterNodesUrl(clusterId) {
    return generatePath(cfg.routes.clusterNodes, { clusterId });
  },

  getClusterSessionsUrl(clusterId) {
    return generatePath(cfg.routes.clusterSessions, { clusterId });
  },

  stripOptionalParams(pattern) {
    return pattern.replace(/\(.*\)/, '');
  }
}

export default cfg;
