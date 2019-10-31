import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import Market from './containers/Market'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Portfolio from './containers/Portfolio'
import Watchlist from './containers/Watchlist'
import StockDetail from './containers/StockDetail';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css'
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AuthAdapter from './adapters/AuthAdapter';
import { connect } from 'react-redux';
import { fetchIndex, fetchSearchHistory, fetchPortfolio, fetchWatchlist } from "./redux/actions";

class App extends Component {
  componentDidMount() {
    this.fetchStockData();

    this.intervalID = setInterval(function(){
      this.fetchStockData();
    }.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  fetchStockData = () => {
    this.props.dispatch(fetchIndex());
    this.props.dispatch(fetchSearchHistory());
    if (AuthAdapter.loggedIn()) {
      this.props.dispatch(fetchPortfolio());
      this.props.dispatch(fetchWatchlist());
    }
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
                    <Button primary onClick={this.handleSignOut} style={{marginTop: '10px'}}>Sign Out</Button>
                }
              </Grid.Column>
              <Grid.Column width={14}>
                <NavBar />
              </Grid.Column>
            </Grid.Row>

            <Route exact path="/login" render={(props) => <LoginForm {...props} /> } />
            <Route exact path="/register" render={(props) => <RegistrationForm {...props} /> } />
            <Route exact path='/' render={() => <Market />} />
            <Route exact path='/portfolio' render={() => <Portfolio />} />
            <Route exact path='/watchlist' render={() => <Watchlist />} />
            <Route path='/detail' render={() => <StockDetail />} />
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

