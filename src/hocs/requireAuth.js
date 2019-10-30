import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthAdapter from '../adapters/AuthAdapter';

function requireAuth(WrappedComponent) {
  return class extends React.Component {
    render() {
      return AuthAdapter.notLoggedIn() ? <Redirect to='/login' /> : <WrappedComponent {...this.props} />;
    }
  }
}

export default requireAuth;