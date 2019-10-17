import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import Market from './containers/Market'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Portfolio from './containers/Portfolio'
import Watchlist from './containers/Watchlist'
import Quote from './containers/Quote';
import { timeParse } from "d3-time-format";
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import './App.css'
import ApiAdapter from './adapters/ApiAdapter';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AuthAdapter from './adapters/AuthAdapter';
import AppAdapter from './adapters/AppAdapter';
import { map } from 'lodash';

//import { BrowserRouter, Route, Link } from 'react-router-dom'
const parseDate = timeParse("%Y-%m-%d");

class App extends Component {
  state = {
    indexes: [],
    symbol: '',
    quote: null,
    quoteNews: [],
    quoteChart: [],
    watchlist: [],
    portfolio: [],
    inPortfolio: false,
    inWatchlist: false,
    searchHistoryQuotes: [],
  }

  componentDidMount() {
    this.intervalID = setInterval(function(){
      this.getIndexes();
      this.getSearchHistoryQuotes();
    }.bind(this),3000);

    if (AuthAdapter.loggedIn()) this.getPortfolio();
    if (AuthAdapter.loggedIn()) this.getWatchlists();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getIndexes = () => {
    fetch(ApiAdapter.getIndexQuotes()).then(r => r.json()).then(indexes => {
      this.setState({ 
        indexes: map(indexes, index => index.quote),
      })
    })
  }

  getSearchHistoryQuotes = () => {
    if (AppAdapter.searchHistory().length > 0) {
      fetch(ApiAdapter.getBatchQuotes(AppAdapter.searchHistory())).then(r => r.json()).then(searchHistoryQuotes => {
          this.setState({ searchHistoryQuotes })
      })
    }
  }

  getWatchlists = () => {
    fetch(`${ApiAdapter.backendHost()}/users/${localStorage.getItem("id")}/watchlists`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
  		},
    }).then(r => r.json()).then(watchlist => {
      this.setState({ watchlist });
    })
  }

  getPortfolio = () => {
    fetch(`${ApiAdapter.backendHost()}/users/${localStorage.getItem("id")}/portfolio_assets`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
  		},
    }).then(r => r.json()).then(portfolio => {
      if (portfolio.length > 0) this.setState({ portfolio });
    })
  }

  handleSearch = keyword => {
    fetch(ApiAdapter.getStockInfo(keyword))
    .then(function(response) {
      if (response.ok) {
        return response;
      }
      throw new Error(keyword);
    })
    .then(res => res.json())
    .then(item => {
      let data = item.chart.map(d => {
        return {
          date: parseDate(d.date),
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
          volume: d.volume,
        }
      })
      data.columns = ['date', 'open', 'high', 'low', 'close', 'volume']

      this.setState({
        symbol: keyword,
        quote: item.quote,
        quoteNews: item.news,
        quoteChart: data,
      })
    }).catch(function(error) {
      this.setState({ quote: `No results for ${error.message}. Please enter a valid stock symbol.` })
    }.bind(this));

    if (AuthAdapter.loggedIn()) {
      if (this.state.portfolio && !!this.state.portfolio.find(portfolioName => portfolioName.symbol.toLowerCase() === keyword.toLowerCase())) {
        this.setState({ inPortfolio: true })
      } else {
        this.setState({ inPortfolio: false })
      }
  
      if (this.state.watchlist && !!this.state.watchlist.find(watchlistName => watchlistName.symbol.toLowerCase() === keyword.toLowerCase())) {
        this.setState({ inWatchlist: true })
      } else {
        this.setState({ inWatchlist: false })
      }
    }
    
    this.updateSearchHistory(keyword);
  }
  
  updateSearchHistory = (symbol) => {
    let newSearchHistory = [];

    if (AppAdapter.searchHistory().length > 0) {
      newSearchHistory = AppAdapter.searchHistory().filter(stock => stock !== symbol);
      newSearchHistory.unshift(symbol); // add to the beginning of array
    } else {
      newSearchHistory.push(symbol);
    }

    localStorage.setItem('searchHistory', newSearchHistory.join(',')); 

    fetch(ApiAdapter.getBatchQuotes(newSearchHistory)).then(r => r.json()).then(searchHistoryQuotes => {
      this.setState({ searchHistoryQuotes })
    })
  }

  handleClick = (name, checked, symbol) => {
    const stateName = name.split('_')[0];
    const fullStateName = stateName + 'Names';
    //console.log(`${stateName}:`, this.state[stateName]);
    const inStateName = 'in'+ stateName.slice(0,1).toUpperCase() + stateName.slice(1);
    let newState;

    if (AuthAdapter.loggedIn()) {
      if (checked) {
        fetch(`${ApiAdapter.backendHost()}/users/${localStorage.getItem("id")}/${name}s`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify({ symbol })
        }).then(r => r.json()).then(stock => {
          newState = [...this.state[fullStateName], stock];
          console.log(this.state)
          this.setState({
            [inStateName]: !this.state[inStateName],
            [fullStateName]: newState,
          }, () => console.log(this.state));
        })
      } else {
        const watchlistId = this.state[fullStateName].find(name => name.symbol.toLowerCase() === symbol.toLowerCase()).id;
        fetch(`${ApiAdapter.backendHost()}/${name}s/${watchlistId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          }
        }).then(r => r.json()).then(() => {
          const entry = this.state[fullStateName].find(name => name.symbol.toLowerCase() === symbol.toLowerCase());
          const index = this.state[fullStateName].indexOf(entry);
          newState = [...this.state[fullStateName].slice(0, index), ...this.state[fullStateName].slice(index+1)];
      
          this.setState({
            [inStateName]: !this.state[inStateName],
            [fullStateName]: newState,
          }, () => console.log(this.state));
        })
      }
    }
  }

  updatePortfolio = (newPortfolio) => {
    this.setState({
      portfolio: newPortfolio,
    })
  }

  handleSignIn = (pageStatus) => {
    this.setState({
      pageStatus
    });
  }

  handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.reload();
  }

  render() {
    // console.log(this.state.watchlistNews);
    
      return (
        <Router>
          <div>
            <Grid centered>
              <Grid.Row>
                <Grid.Column computer={6} mobile={14}>
                  <NavLink to='/' exact><h1 style={{marginTop: '5px'}}>Portfolio Manager and Hedger</h1></NavLink>
                </Grid.Column>
                <Grid.Column computer={6} mobile={12}>
                  <SearchBar search={this.handleSearch}/>
                </Grid.Column>
                <Grid.Column computer={2} mobile={2}>
                  {
                    AuthAdapter.notLoggedIn() ?
                      <Login signIn={this.handleSignIn}/>
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

              <Route exact path='/' render={() => <Market indexes={this.state.indexes} searchHistory={this.state.searchHistoryQuotes} search={this.handleSearch}/>} />
              <Route exact path='/portfolio' render={() => <Portfolio indexes={this.state.indexes} portfolio={this.state.portfolio} search={this.handleSearch} updatePortfolio={this.updatePortfolio}/>} />
              <Route exact path='/watchlist' render={() => <Watchlist indexes={this.state.indexes} watchlist={this.state.watchlist} search={this.handleSearch}/>} />
              <Route path='/quote' render={() => <Quote quote={this.state.quote} news={this.state.quoteNews} chart={this.state.quoteChart} click={this.handleClick} inPortfolio={this.state.inPortfolio} inWatchlist={this.state.inWatchlist}/>} />
            </Grid>
          </div>
        </Router>
      );
  }
}

export default App;
