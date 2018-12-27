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

import cfg from 'app/config';
import auth from 'app/services/auth';
import history from 'app/services/history';
import { createMemoryHistory } from 'history';
import reactor from 'app/reactor';
import api from 'app/services/api';
import {AuthProviderTypeEnum} from 'app/services/enums';
import 'app/flux';

import * as actions from './actions';
import * as UserFlux from './index';
import { RECEIVE_USER } from './actionTypes';
import * as apiData from 'app/fixtures';

describe('flux/user/getters', () => {
  it('should return "user"', () => {
    const userName = apiData.userContext.userName;
    reactor.dispatch(RECEIVE_USER, { name: userName });
    expect(reactor.evaluate(UserFlux.getters.userName)).toEqual(userName);
  });
});

describe('flux/user/actions', () => {

  history.init(createMemoryHistory());

  beforeEach(() => {
    jest.spyOn(history, 'push').mockImplementation();
    global.u2f = {
      sign() { },
      register() { },
    };
  });

  afterEach(() => {
    reactor.reset();
    jest.clearAllMocks();
    delete global.u2f;
  })

  // sample data
  const inviteToken = 'd82e9f81b3826801af8da16cde3335cbffcef5f7e9490e880b3fcc3f894efcfb';
  const secretToken = 'sample_secret_token';
  const user = 'user@example.com';
  const email = user;
  const password = 'sample_pass';

  describe('fetchInvite', () => {

    const inviteInfoSample = {
      invite_token: inviteToken,
      qr: "iVBORw0KG",
      user: "dada"
    };

    it('should handle loading state', async () => {
      expect.assertions(1);
      jest.spyOn(api, 'get')
        .mockImplementation(() => {
          const rec = reactor.evaluate(UserFlux.getters.fetchingInvite);
          expect(rec.isProcessing).toEqual(true);
          return Promise.resolve();
        });

      await actions.fetchInvite(inviteToken);
    });

    it('should handle failed state', async () => {
      const message = 'error';
      jest.spyOn(api, 'get')
        .mockImplementation(() => Promise.reject(new Error(message)));

      await actions.fetchInvite(inviteToken);

      const rec = reactor.evaluate(UserFlux.getters.fetchingInvite);
      expect(rec.isFailed).toBe(true);
      expect(rec.message).toEqual(message)
    });

    it('should handle success state', async () => {
      jest.spyOn(api, 'get')
        .mockImplementation(() => Promise.resolve(inviteInfoSample));

      await actions.fetchInvite(inviteToken);

      const rec = reactor.evaluate(UserFlux.getters.fetchingInvite);
      expect(rec.isSuccess).toBe(true);
      expect(reactor.evaluateToJS(UserFlux.getters.invite)).toEqual(inviteInfoSample);
    });
  });

  describe('login()', () => {
    const webApiUrl = '/v1/webapi/oidc/login/web?redirect_url=:redirect&connector_id=:providerName';
    const oidcSsoProvider = { name: 'microsoft', type: AuthProviderTypeEnum.OIDC, url: webApiUrl };
    const defaultEntryRoute = history.ensureBaseUrl(cfg.routes.app);

    it('should login with email', async () => {
      jest.spyOn(auth, 'login')
        .mockImplementation(() => Promise.resolve(apiData.bearerToken));

      await actions.login(email, password);
      expect(history.push).toHaveBeenCalledWith(defaultEntryRoute, true);
    });

    it('should login with SSO', () => {
      const expectedUrl = `http://localhost/v1/webapi/oidc/login/web?redirect_url=http%3A%2F%2Flocalhost%2Fweb&connector_id=${oidcSsoProvider.name}`;
      actions.loginWithSso(oidcSsoProvider.name, oidcSsoProvider.url);
      expect(history.push).toHaveBeenCalledWith(expectedUrl, true);
    });

    it('should login with U2F', async () => {
      const dummyResponse = { appId: 'xxx' }
      jest.spyOn(api, 'post')
        .mockImplementation(() => Promise.resolve(dummyResponse));

      jest.spyOn(window.u2f, 'sign')
        .mockImplementation((a, b, c, d) => {
          d(dummyResponse)
      });

      await actions.loginWithU2f(email, password);
      expect(window.u2f.sign).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(defaultEntryRoute, true);
    });

    it('should handle loginAttemp states', async () => {
       jest.spyOn(auth, 'login')
        .mockImplementationOnce(() => Promise.resolve());

      await actions.login(email, password);

      // processing
      let attempt = reactor.evaluateToJS(UserFlux.getters.loginAttemp);
      expect(attempt.isProcessing).toBe(true);

      // reject
      reactor.reset();
      jest.spyOn(auth, 'login')
        .mockImplementationOnce(() => Promise.reject(new Error("this is error")));

      await actions.login(email, password);

      attempt = reactor.evaluateToJS(UserFlux.getters.loginAttemp);
      expect(attempt.isFailed).toBe(true);
    });
  })

  it('acceptInvite() should accept invite with 2FA', async () => {
    const submitData = {
      user,
      pass: password,
      second_factor_token: secretToken,
      invite_token: inviteToken
    }

    jest.spyOn(api, 'post')
      .mockImplementationOnce(() => Promise.resolve());

    await actions.acceptInvite(user, password, secretToken, inviteToken);

    expect(api.post).toHaveBeenCalledWith(cfg.api.createUserPath, submitData, false);
    expect(history.push).toHaveBeenCalledWith(cfg.routes.app, true);
  });

  it('acceptInviteWithU2f() should accept invite with U2F', async () => {
    const appId = 'xxx';
    const dummyResponse = { appId };

    jest.spyOn(api, 'post')
      .mockImplementationOnce(() => Promise.resolve());

    jest.spyOn(api, 'get')
      .mockImplementationOnce(() => Promise.resolve(dummyResponse));

    jest.spyOn(window.u2f, 'register')
      .mockImplementationOnce((a, b, c, d) => {
        d(dummyResponse)
    });

    await actions.acceptInviteWithU2f(user, password, inviteToken);
    expect(history.push).toHaveBeenCalledWith(cfg.routes.app, true);
  });
});
