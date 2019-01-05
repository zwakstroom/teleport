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
import { Store } from 'nuclear-js';
import { Record, List } from 'immutable';
import { initAppAttempt } from 'app/flux/status/getters';
import * as AT from './actionTypes';

const STORE_NAME = 'tlpt';
class AppRec extends Record({
  version: '',
  siteId: null,
  navItems: new List()
}){

  constructor(props) {
    super(props)
  }

  setSiteId(siteId) {
    return this.set('siteId', siteId);
  }

  setVersion(version) {
    return this.set('version', version);
  }

  getClusterName() {
    return this.get('siteId');
  }

  getNavItems(){
    return this.navItems.toJS();
  }

  addNavItem(navItem) {
    return this.set('navItems', this.navItems.push(navItem))
  }
}

export function getStore() {
  return reactor.evaluate(['tlpt']);
}

const store = Store({

  getInitialState() {
    return new AppRec();
  },

  initialize() {
    this.on(AT.SET_SITE_ID, (state, siteId) => state.setSiteId(siteId));
    this.on(AT.SET_VERSION, (state, version) => state.setVersion(version));
    this.on(AT.ADD_NAV_ITEM, (state, navItem) => state.addNavItem(navItem))
  }
});

export const register = reactor => {
  reactor.registerStores({
    [STORE_NAME]: store
  })
}

export const getters = {
  store: [STORE_NAME],
  initAttempt: initAppAttempt,
  siteId: [STORE_NAME, 'siteId']
}