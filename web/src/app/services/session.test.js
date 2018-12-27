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

import cfg from '../config';
import history from './history';
import api from './api';
import session, { BearerToken } from './session';
import localStorage, { KeysEnum } from './localStorage';
import 'shared/utils/polyfillFinally';

describe('services/session', () => {

  beforeEach(() => {
    jest.spyOn(session, '_startSessionChecker').mockImplementation();
    jest.spyOn(session, '_stopSessionChecker').mockImplementation();
    jest.spyOn(history, '_pageRefresh').mockImplementation();
    jest.spyOn(localStorage, 'clear').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    session.clear();
  })

  describe('logout()', () => {
    it('should clear localStorage, stop session checker, and redirect to login page', () => {
      expect.assertions(4);
      jest.spyOn(api, 'delete').mockImplementation(() => Promise.resolve());
      return session.logout().then(() => {
        expect(api.delete).toHaveBeenCalledWith(cfg.api.sessionPath);
        expect(session._stopSessionChecker).toHaveBeenCalled();
        expect(localStorage.clear).toHaveBeenCalled();
        expect(history._pageRefresh).toHaveBeenCalledWith(cfg.routes.login);
      })
    });
  });

   describe('ensureSession()', () => {
    const json = {
      "token": "eca3a5e81281d5159cbb95dd5f62900d",
      "expires_in": 599
    };

    const expiredBearerToken = new BearerToken(json);
    expiredBearerToken.created = 0;

    it('should renew a token', () => {
      jest.spyOn(localStorage, 'getBearerToken').mockReturnValue(expiredBearerToken);
      jest.spyOn(localStorage, 'setBearerToken').mockImplementation();
      jest.spyOn(localStorage, 'broadcast');
      jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve(json));

      expect.assertions(5);
      return session.ensureSession().then(() => {
        expect(api.post).toHaveBeenCalledWith(cfg.api.renewTokenPath);
        expect(localStorage.broadcast).toHaveBeenCalledWith(KeysEnum.TOKEN_RENEW, true);
        expect(session._startSessionChecker).toHaveBeenCalled();

        const newToken = localStorage.setBearerToken.mock.calls[0][0];
        expect(newToken.accessToken).toBe(json.token);
        expect(newToken.created).toBeGreaterThan(0);
      })
    });

     it('should logout if token is missing', () => {
      jest.spyOn(localStorage, 'getBearerToken').mockReturnValue(null);
      jest.spyOn(session, 'logout').mockImplementation();
      expect.assertions(1);
      return session.ensureSession().catch(() => {
        expect(session.logout).toHaveBeenCalled();
      });
    });
  });
})

