import React from 'react';
import session from 'app/services/session';

const withAuth = component => {

  return class WithAuthWrapper extends React.Component{

    static displayName = `WithAuthWrapper`

    state = {
      hasUser: false
    }

    componentDidMount() {
      session.ensureSession(true).then(() => {
        this.setState({
          hasUser: true
        })
      })
    }

    render() {
      if (this.state.hasUser) {
        return React.createElement(component, this.props);
      }

      return null;
    }
  }
}

export default withAuth;