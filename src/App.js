import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import Market from './containers/Market'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Portfolio from './containers/Portfolio'
import Watchlist from './containers/Watchlist'
import DetailQuote from './containers/DetailQuote';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import './App.css'
import ApiAdapter from './adapters/ApiAdapter';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AuthAdapter from './adapters/AuthAdapter';
import { connect } from 'react-redux';
import { fetchIndex, fetchSearchHistory } from "./redux/actions";

class App extends Component {
  componentDidMount() {
    this.intervalID = setInterval(function(){
      this.props.dispatch(fetchIndex());
      this.props.dispatch(fetchSearchHistory());
    }.bind(this),3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      window.location.reload();
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Grid centered>
            <Grid.Row>
              <Grid.Column computer={6} mobile={14}>
                <NavLink to='/' exact><h1 style={{marginTop: '5px'}}>Portfolio Manager and Hedger</h1></NavLink>
              </Grid.Column>
              <Grid.Column computer={6} mobile={12}>
                <SearchBar />
              </Grid.Column>
              <Grid.Column computer={2} mobile={2}>
                {
                  AuthAdapter.notLoggedIn() ?
                    <div style={{marginTop: '10px'}}>
                        <NavLink exact to="/login">
                            <Button primary>Sign In</Button>
                        </NavLink>
                        <NavLink exact to="/register">
                            <Button secondary>Sign Up</Button>
                        </NavLink>
                    </div>
                  :
                    <Button primary name='sign_out' onClick={this.handleSignOut} style={{marginTop: '10px'}}>Sign Out</Button>
                }
              </Grid.Column>
              <Grid.Column width={14}>
                <NavBar {...this.state}/>
              </Grid.Column>
            </Grid.Row>

            {
              AuthAdapter.notLoggedIn() ?
                <React.Fragment>
                  <Route exact path="/login" render={(props) => <LoginForm {...props} /> } />
                  <Route exact path="/register" render={(props) => <RegistrationForm {...props} /> } />
                </React.Fragment>
              :
                <Redirect to="/"/>
            }

            <Route exact path='/' render={() => <Market />} />
            <Route exact path='/portfolio' render={() => <Portfolio />} />
            <Route exact path='/watchlist' render={() => <Watchlist />} />
            <Route path='/quote' render={() => <DetailQuote />} />
          </Grid>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps
)(App);

