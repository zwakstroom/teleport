import React from 'react'
import { storiesOf } from '@storybook/react'
import { Clusters } from './Clusters'

storiesOf('Teleport/Clusters', module)
  .add('With CardCluster components', () => {
    return (
      <Clusters
        onSelectCluster={() => window.alert("Selected!")}
        siteId="one"
        clusters={clusters}
      />
    );
  });

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