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

import createHistory from 'history/createBrowserHistory';
import { matchPath } from "react-router";
import cfg from 'app/config';

let _inst = null;

const history = {

  original(){
    return _inst;
  },

  init(history){
    _inst = history || createHistory();
  },

  push(route, withRefresh = false) {
    route = this.ensureSafeRoute(route);
    if (withRefresh) {
      this._pageRefresh(route);
    } else {
      _inst.push(route)
    }
  },

  goBack(number) {
    this.original().goBack(number);
  },

  goToLogin(rememberLocation) {
    let url = cfg.routes.login;
    if (rememberLocation) {
      let redirectUrl = _inst.createHref(_inst.location);
      redirectUrl = this.ensureSafeRoute(redirectUrl);
      redirectUrl = this.ensureBaseUrl(redirectUrl);
      url = `${url}?redirect_uri=${redirectUrl}`;
    }

    this._pageRefresh(url);
  },

  getRedirectParam() {
    let loc = this.original().location;
    if (loc.query && loc.query.redirect_uri) {
      return loc.query.redirect_uri;
    }

    return '';
  },

  ensureSafeRoute(url) {
    url = this._canPush(url) ? url : cfg.routes.app;
    return url;
  },

  ensureBaseUrl(url) {
    url = url || '';
    if (url.indexOf(cfg.baseUrl) !== 0) {
      url = cfg.baseUrl + url;
    }

    return url;
  },

  getRoutes() {
    return Object.getOwnPropertyNames(cfg.routes).map(p => cfg.routes[p]);
  },

  _canPush(route) {
    route = route || '';
    let routes = this.getRoutes();
    if (route.indexOf(cfg.baseUrl) === 0) {
      route = route.replace(cfg.baseUrl, '')
    }

    return routes.some(match(route));
  },

  _pageRefresh(route) {
    window.location.href = this.ensureBaseUrl(route);
  }
}

const match = url => route => {
  return matchPath(url, {
    path: route,
    exact: true
  })
}

export default history;