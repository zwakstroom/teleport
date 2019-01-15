import React from 'react'
import history from 'app/services/history';
import { createMemoryHistory } from 'history';
import { storiesOf } from '@storybook/react'
import { ClusterNodes } from './ClusterNodes'
import { Router } from 'react-router';

import { AccessListRec } from 'app/flux/userAcl/store';
import { SshHistoryRec } from 'app/flux/sshHistory/store';
import { NodeStoreRec } from 'app/flux/nodes/nodeStore';

storiesOf('Teleport/ClusterNodes', module)
  .add('ClusterAuditLog', () => {
    return (
      <ClusterNodesStory/>
    );
  });

class ClusterNodesStory extends React.Component {
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
        <ClusterNodes
          nodes={nodeStore.getSiteServers("one")}
          aclStore={aclStore}
          sshHistory={sshHistory}
        />
      </Router>
    )
  }
}

const sshHistory = new SshHistoryRec()

const aclStore = new AccessListRec({
  "sessions": {
    "list": true,
    "read": true,
    "edit": false,
    "create": false,
    "remove": false
  },
  "authConnectors": {
    "list": true,
    "read": true,
    "edit": true,
    "create": true,
    "remove": true
  },
  "roles": {
    "list": true,
    "read": true,
    "edit": true,
    "create": true,
    "remove": true
  },
  "trustedClusters": {
    "list": true,
    "read": true,
    "edit": true,
    "create": true,
    "remove": true
  },
  "sshLogins": [
    "root",
    "akontsevoy"
  ]
});

const nodeStore = new NodeStoreRec().addSiteServers([{
  "id": "1d8d5c80",
  "siteId": "one",
  "hostname": "a28e5340e618",
  "addr": "172.10.1.20:3022",
  "tags": [
    {
      "name": "cluster",
      "value": "one"
    },
    {
      "name": "kernel",
      "value": "4.15.0-36-generic"
    }
  ]
},
{
  "id": "3685a9ec",
  "siteId": "one",
  "hostname": "one",
  "addr": "172.10.1.1:3022",
  "tags": [
    {
      "name": "cluster",
      "value": "one"
    },
    {
      "name": "kernel",
      "value": "4.15.0-36-generic"
    }
  ]
}]);