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

import localStorage from 'app/services/localStorage';
import {BearerToken} from 'app/services/session';

describe('services/localStorage', () => {

  it('should put and retrieve bearer token from browser localStorage', () => {
    const bearerToken = new BearerToken({"token": "sample_token", "expires_in": 599});

    localStorage.setBearerToken(bearerToken);
    const actual = localStorage.getBearerToken();
    expect(actual.accessToken).toEqual(bearerToken.accessToken);
  });

})