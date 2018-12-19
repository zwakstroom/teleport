import reactor from 'app/reactor';
import { TLPT_NODES_RECEIVE } from './actionTypes';
import api from 'app/services/api';
import cfg from 'app/config';
import appGetters from 'app/flux/app/getters';
import Logger from 'app/lib/logger';

const logger = Logger.create('Modules/Nodes');

export default {
  fetchNodes() {
    const siteId = reactor.evaluate(appGetters.siteId);
    return api.get(cfg.api.getSiteNodesUrl(siteId))
      .then(res => res.items || [])
      .then(items => reactor.dispatch(TLPT_NODES_RECEIVE, items))
      .catch(err => {
        logger.error('fetchNodes', err);
        throw err;
      })
  }
}