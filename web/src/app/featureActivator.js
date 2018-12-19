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

import Logger from 'app/lib/logger';
const logger = Logger.create('featureActivator');

/**
 * Invokes methods on a group of registered features.
 *
 */
class FeactureActivator {

  constructor() {
    this._features = [];
  }

  register(feature) {
    if (!feature) {
      throw Error('Feature is undefined');
    }

    this._features.push(feature);
  }

  /**
   * to be called during app initialization. Becomes useful if feature wants to be
   * part of app initialization flow.
   */
  preload(context) {
    let promises = this._features.map(f => {
      return new Promise(resolve => {
        // feature should handle failed promises thus always resolve.
        f.init(context).finally(() => {
          resolve();
        })
      })
    });

    return Promise.all(promises);
  }

  onload(context) {
    this._features.forEach(f => {
      this._invokeOnload(f, context);
    });
  }

  getFirstAvailable(){
    return this._features.find( f => !f.isFailed() );
  }

  getFeatures() {
    return this._features;
  }

  _invokeOnload(f, ...props) {
    try {
      f.onload(...props);
    } catch(err) {
      logger.error('failed to invoke feature onload()', err);
    }
  }

}

export default FeactureActivator;