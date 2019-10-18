import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import Market from './containers/Market'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Portfolio from './containers/Portfolio'
import Watchlist from './containers/Watchlist'
import DetailQuote from './containers/DetailQuote';
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
    detailQuote: {},
    watchlist: [],
    portfolio: [],
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
      if (response.ok) return response;
      throw new Error(keyword);
    })
    .then(res => res.json())
    .then(item => {
      this.setState({
        detailQuote: {
          quote: item.quote,
          news: item.news,
          chart: this.transformItemDataForChart(item),
          inWatchlist: this.inWatchlistStatus(keyword),
          inPortfolio: this.inPortfolioStatus(keyword),
        },
      })
    }).catch((error) => {
      this.setState({ 
        detailQuote: {
          error: `No results for ${error.message}. Please enter a valid stock symbol.`,
        }
      })
    });
    
    this.updateSearchHistory(keyword);
  }

  transformItemDataForChart = (item) => {
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

    return data;
  }

  inPortfolioStatus(keyword) {
    if (AuthAdapter.loggedIn() && this.state.portfolio && !!this.state.portfolio.find(portfolioName => portfolioName.symbol.toLowerCase() === keyword.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  inWatchlistStatus(keyword) {
    if (AuthAdapter.loggedIn() && this.state.watchlist && !!this.state.watchlist.find(watchlistName => watchlistName.symbol.toLowerCase() === keyword.toLowerCase())) {
      return true;
    } else {
      return false;
    }
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

  handleClick = (stateName, checked, symbol) => {
    const statusName = 'in'+ stateName.slice(0,1).toUpperCase() + stateName.slice(1); // inWatchlist or inPortfolio
    const endpoint = stateName === 'portfolio' ? 'portfolio_assets' : `${stateName}s`;

    if (AuthAdapter.loggedIn()) {
      if (checked) {
        fetch(`${ApiAdapter.backendHost()}/users/${localStorage.getItem("id")}/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify({ symbol })
        }).then(r => r.json()).then(stock => {
          this.setState({
            [stateName]: this.addStock(this.state[stateName], stock),
            detailQuote: {
              ...this.state.detailQuote,
              [statusName]: !this.state.detailQuote[statusName],  // toggle inWatchlist or inPortfolio status
            }
          });
        })
      } else {
        const id = this.state[stateName].find(name => name.symbol.toLowerCase() === symbol.toLowerCase()).id;
        fetch(`${ApiAdapter.backendHost()}/${endpoint}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          }
        }).then(r => r.json()).then(() => {
          const stock = this.state[stateName].find(stock => stock.id === id);
      
          this.setState({
            [stateName]: this.removeStock(this.state[stateName], stock),
            detailQuote: {
              ...this.state.detailQuote,
              [statusName]: !this.state.detailQuote[statusName],  // toggle inWatchlist or inPortfolio status
            }
          });
        })
      }
    }
  }

  addStock = (array, stock) => {
    return [...array, stock];
  }

  removeStock = (array, stock) => {
    const index = array.indexOf(stock);
    
    return [
      ...array.slice(0, index), 
      ...array.slice(index + 1)
    ];
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
            <Route path='/quote' render={() => <DetailQuote {...this.state.detailQuote} click={this.handleClick}/>} />
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
