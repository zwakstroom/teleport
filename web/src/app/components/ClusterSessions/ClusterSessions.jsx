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

import moment from 'moment';
import React from 'react';
import { connect } from './../nuclear';
import { fetchSiteEventsWithinTimeRange } from 'app/flux/storedSessionsFilter/actions';
import sessionGetters from 'app/flux/sessions/getters';
import AjaxPoller from './../dataProvider.jsx';
import SessionList from './SessionList';
import { DocumentTitle } from './../documentTitle';
import withStorage from './../withStorage.jsx';
import Header from 'app/components/Header';

const end = moment(new Date()).endOf('day').toDate();
const start = moment(end).subtract(20, 'day').startOf('day').toDate();

const defaultState = {
  searchValue: '',
  dateFilter: {
    start,
    end
  }
}

export class ClusterSessions extends React.Component {

  state = {
    ...defaultState
  }

  onSearchValueChange = value => {
    this.state.searchValue = value;
    this.setState(this.state);
  }

  refresh = () => {
    const { clusterId, fetch } = this.props;
    const { start, end } = this.state.dateFilter;
    return fetch(clusterId, start, end);
  }

  render() {
    const { searchValue, dateFilter } = this.state;
    const { clusterId, storedSessions, activeSessions } = this.props;
    const title = `${clusterId} · Sessions`;

    return (
      <DocumentTitle title={title}>
        <Header title="Audit Log" searchValue={searchValue} onSearchChange={this.onSearchValueChange} />
        <SessionList
          searchValue={searchValue}
          storage={this.props.storage}
          activeSessions={activeSessions}
          storedSessions={storedSessions}
          filter={dateFilter}
        />
        <AjaxPoller onFetch={this.refresh} />
      </DocumentTitle>
    );
  }
}

function mapStoreToProps() {
  return {
    activeSessions: sessionGetters.activeSessionList,
    storedSessions: sessionGetters.storedSessionList,
  }
}

function mapActionsToProps() {
  return {
    fetch: fetchSiteEventsWithinTimeRange,
  }
}

const SessionsWithStorage = withStorage(ClusterSessions);

export default connect(mapStoreToProps, mapActionsToProps)(SessionsWithStorage);