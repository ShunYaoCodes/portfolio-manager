import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function withAuth(WrappedComponent) {
  class Wrapper extends React.Component {
    render() {
      return this.props.token ? <Redirect to='/' /> : <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    const { token } = state.auth;
    return { token };
  };
  
  return connect(mapStateToProps)(Wrapper);
}

export default withAuth;