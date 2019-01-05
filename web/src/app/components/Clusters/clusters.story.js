import React from 'react'
import { storiesOf } from '@storybook/react'
import { Clusters } from './Clusters'
import reactor from 'app/reactor';
import history from 'app/services/history';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import 'app/flux';
import { Provider } from './../nuclear';
import { RECEIVE_USER } from 'app/flux/user/actionTypes';

storiesOf('Teleport/Clusters', module)
  .add('With CardCluster components', () => {
    return (
      <ClustersPage/>
    );
  });

class ClustersPage extends React.Component {
  constructor(props) {
    super(props);
    this.inMemoryHistory = createMemoryHistory({
      initialEntries: ['/web/'],
      initialIndex: 0
    });

    history.init(this.inMemoryHistory);
    reactor.dispatch(RECEIVE_USER, { name: 'John Smith' });
  }

  render() {
    return(
      <Router history={this.inMemoryHistory}>
        <Provider reactor={reactor}>
          <Clusters
            onSelectCluster={() => window.alert("Selected!")}
            siteId="one"
            clusters={clusters}
            />
        </Provider>
      </Router>
    )
  }
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