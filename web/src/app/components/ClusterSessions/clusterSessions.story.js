import React from 'react'
import history from 'app/services/history';
import { createMemoryHistory } from 'history';
import { storiesOf } from '@storybook/react'
import { ClusterSessions } from './ClusterSessions'
import { Router } from 'react-router';
import 'app/flux';

storiesOf('Teleport/ClusterAudit', module)
  .add('ClusterAuditLog', () => {
    return (
      <ClusterSessionStory/>
    );
  });

class ClusterSessionStory extends React.Component {
  constructor(props) {
    super(props);

    this.inMemoryHistory = createMemoryHistory({
      initialEntries: ['/web/'],
      initialIndex: 0
    });

    history.init(this.inMemoryHistory);

  }

  render() {
    return (
      <Router history={this.inMemoryHistory}>
        <ClusterSessions
          storedSessions={storedSessions}
          activeSessions={[]}
          clusterId="one"
          fetch={ () => Promise.resolve() }
        />
      </Router>
    )
  }
}

const storedSessions = [
  {
    "active": false,
    "parties": [
      "alex-kovoy [172.10.1.254]"
    ],
    "sid": "ec331395-0ade-11e9-993f-0242ac0a0101",
    "duration": 654637,
    "siteId": "one",
    "sessionUrl": "/web/player/cluster/one/sid/ec331395-0ade-11e9-993f-0242ac0a0101",
    "created": "2018-12-28T20:26:57.508Z",
    "createdDisplayText": "12/28/2018 15:26:57",
    "nodeDisplayText": "one [172.10.1.1]",
    "lastActive": "2018-12-28T20:37:52.145Z"
  },
  {
    "active": false,
    "parties": [
      "mama [172.10.1.254]"
    ],
    "sid": "6cc09a72-040f-11e9-922d-0242ac0a0101",
    "duration": 455086,
    "siteId": "one",
    "sessionUrl": "/web/player/cluster/one/sid/6cc09a72-040f-11e9-922d-0242ac0a0101",
    "created": "2018-12-20T04:26:30.895Z",
    "createdDisplayText": "12/19/2018 23:26:30",
    "nodeDisplayText": "one [172.10.1.1]",
    "lastActive": "2018-12-20T04:34:05.981Z"
  },
  {
    "active": false,
    "parties": [
      "mama [172.10.1.254]"
    ],
    "sid": "d6de69a4-040d-11e9-8d09-0242ac0a0101",
    "duration": 33102,
    "siteId": "one",
    "sessionUrl": "/web/player/cluster/one/sid/d6de69a4-040d-11e9-8d09-0242ac0a0101",
    "created": "2018-12-20T04:15:09.958Z",
    "createdDisplayText": "12/19/2018 23:15:09",
    "nodeDisplayText": "6077058edc53 [172.10.1.20]",
    "lastActive": "2018-12-20T04:15:43.06Z"
  },
];