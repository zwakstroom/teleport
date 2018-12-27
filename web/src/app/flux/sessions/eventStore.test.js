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

import getters from 'app/flux/sessions/getters';
import reactor from 'app/reactor';
import api from 'app/services/api';
import * as actions from 'app/flux/sessions/actions';
import { setSiteId } from 'app/flux/app/actions';
import { activeSessions } from 'app/fixtures'
import 'app/flux';

describe('flux/sessions', () => {

  const siteid = 'siteid123';

  beforeEach(() => {
    setSiteId(siteid);
  });

  afterEach(() => {
    reactor.reset();
    jest.clearAllMocks();
  })

  it('should get "activeSessionById"', async () => {
    jest.spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve(activeSessions) );

    await actions.fetchActiveSessions();

    const sid = '11d76502-0ed7-470c-9ae2-472f3873fa6e';
    const actual = reactor.evaluateToJS(getters.activeSessionById(sid));
    const expected = {
      'id': sid,
      'login': 'akontsevoy',
      'namespace': undefined,
      'server_id': undefined,
      'active': true,
      'created': '2016-03-15T19:55:49.251601013Z',
      'last_active': '2016-03-15T19:55:49.251601164Z',
      'siteId': siteid,
      'parties': [
        {
          'user': 'user1',
          'serverIp': '127.0.0.1:60973',
          'serverId': 'ad2109a6-42ac-44e4-a570-5ce1b470f9b6'
        },
        {
          'user': 'user2',
          'serverIp': '127.0.0.1:60973',
          'serverId': 'ad2109a6-42ac-44e4-a570-5ce1b470f9b6'
        }
      ]
    }

    expect(actual).toEqual(expected);
  });

})