import React from 'react'
import { storiesOf } from '@storybook/react'
import { Settings } from './Settings'
import reactor from 'app/reactor';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import 'app/flux';
import { RECEIVE_USER } from 'app/flux/user/actionTypes';
import { Provider } from './../nuclear';

storiesOf('Teleport/Settings', module)
  .add('Settings', () => {
    return (
      <ClustersPage/>
    );
  });

class ClustersPage extends React.Component {
  constructor(props) {
    super(props);
    this.inMemoryHistory = createMemoryHistory({ });
    reactor.dispatch(RECEIVE_USER, { name: 'John Smith' });
  }

  render() {
    const onChangePass = () => null;
    const onChangePassWithU2f = () => null;
    const onDestory = () => null;
    const attempt = {}

    return(
      <Router history={this.inMemoryHistory}>
        <Provider reactor={reactor}>
          <Settings
            auth2faType
            onChangePass={onChangePass}
            onChangePassWithU2f={onChangePassWithU2f}
            onDestory={onDestory}
            attempt={attempt}
            />
        </Provider>
      </Router>
    )
  }
}

