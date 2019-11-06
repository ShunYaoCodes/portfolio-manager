import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function requireAuth(WrappedComponent) {
  class Wrapper extends React.Component {
    render() {
      return this.props.token ? <WrappedComponent {...this.props} /> : <Redirect to='/login' />;
    }
  }

  const mapStateToProps = (state) => {
    const { token } = state.auth;
    return { token };
  };

  return connect(mapStateToProps)(Wrapper);
}

export default requireAuth;