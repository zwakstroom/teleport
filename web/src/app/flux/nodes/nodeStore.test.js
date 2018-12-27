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

import 'app/flux';
import api from 'app/services/api';
import reactor from 'app/reactor';
import { fetchNodes } from './actions';
import getters from 'app/flux/nodes/getters';
import { getNodeStore } from 'app/flux/nodes/nodeStore';
import { setSiteId } from 'app/flux/app/actions';
import { nodes } from 'app/fixtures'

describe('flux/nodes', () => {
  const siteid = 'siteid123';
  const serverId = 'ad2109a6-42ac-44e4-a570-5ce1b470f9b6';

  beforeEach(() => {
    setSiteId(siteid);
  });

  afterEach(() => {
    reactor.reset();
    jest.clearAllMocks();
  })

  it('getters', async () => {
    jest.spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve(nodes) );

    await fetchNodes();
    const server = getNodeStore().findServer(serverId);
    expect(server.hostname).toEqual('x220');
    expect(reactor.evaluateToJS(getters.siteNodes)).toEqual(nodes.items);
  });

})
