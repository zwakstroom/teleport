import React from 'react'
import { storiesOf } from '@storybook/react'
import { Cluster } from './Cluster'
import reactor from 'app/reactor';
import { Provider } from './../nuclear';
import { Router } from 'react-router';
import history from 'app/services/history';
import { createMemoryHistory } from 'history';
import 'app/flux';

storiesOf('Teleport/Cluster', module)
  .add('With Nodes List', () => {
    return (
      <ClusterPage/>
    );
  });

class ClusterPage extends React.Component {
  constructor(props) {
    super(props);
    this.inMemoryHistory = createMemoryHistory({
      initialEntries: ['/web/cluster/one'],
      initialIndex: 0
    });

    history.init(this.inMemoryHistory);
    initReactor();
  }

  render() {
    return(
      <Router history={this.inMemoryHistory}>
        <Provider reactor={reactor}>
          <Cluster
            onSelectCluster={() => window.alert("Selected!")}
            clusterId="one"
            clusters={clusters}
          />
        </Provider>
      </Router>
    )
  }
}

function initReactor() {

  reactor.dispatch("TLPT_USERACL_RECEIVE", {
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

  reactor.dispatch("TLPT_NODES_RECEIVE",
    [
      {
        "id": "1d8d5c80-d74d-43bc-97e4-34da0554ff57",
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
        "id": "3685a9ec-7f1b-47e9-aae8-403f67b9d679",
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
      }
    ]);
}


const clusters = [{
  "name": "one",
  "status": "online",
  "connectedAt": "2018-12-17 17:48:19"
},
{
  "name": "66dfccf2-867f-4835-a337-8d5a241365ed",
  "status": "online",
  "connectedAt": "2018-12-17 17:48:19"
},
{
  "name": "192.168.7.1",
  "status": "offline",
  "connectedAt": "2018-12-17 17:48:19"
}
];