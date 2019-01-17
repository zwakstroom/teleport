import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayerDialog from './PlayerDialog';

storiesOf('Teleport/PlayerDialog', module)
  .add('loading', () => {
    const props = {
      match: {
        params: {
          siteId: '/sample',
          sid: '/fsdfd'
        }
      }
    };

    return (
      <PlayerDialog  {...props} />);
  });
