import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import Market from './containers/Market'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Portfolio from './containers/Portfolio'
import Watchlist from './containers/Watchlist'
import Quote from './containers/Quote';
import { timeParse } from "d3-time-format";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css'

//import { BrowserRouter, Route, Link } from 'react-router-dom'
const parseDate = timeParse("%Y-%m-%d");

class App extends Component {
  state = {
    news: [],
    indexes: [],
    symbol: '',
    quote: null,
    quoteNews: [],
    quoteChart: [],
    searchHistory: [],
    portfolio: [],
    watchlist: [],
    watchlistNews: [],
    inPortfolio: false,
    inWatchlist: false,
    searchHistoryQuotes: [],
    portfolioQuotes: [],
    watchlistQuotes: [],
    mostActive: [],
    gainers: [],
    losers: [],
  }

  componentDidMount() {
    this.intervalID = setInterval(function(){
      fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols=spy,dia,qqq,iwm,vxx&types=quote')
      .then(r => r.json()).then(indexes => {
        const indexArr = [];

        for(const index in indexes) {
          indexArr.push(indexes[index].quote)
        }
        //console.log(indexArr);
        this.setState({ indexes: indexArr })
      })

      fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.searchHistory}&types=quote`)
      .then(r => r.json()).then(searchHistoryQuotes => {
        this.setState({ searchHistoryQuotes })
      })

      fetch(`https://api.iextrading.com/1.0/stock/market/list/mostactive`)
      .then(r => r.json()).then(mostActive => {
        this.setState({ mostActive })
      })

      fetch(`https://api.iextrading.com/1.0/stock/market/list/gainers`)
      .then(r => r.json()).then(gainers => {
        this.setState({ gainers })
      })

      fetch(`https://api.iextrading.com/1.0/stock/market/list/losers`)
      .then(r => r.json()).then(losers => {
        this.setState({ losers })
      })

      fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.watchlist}&types=quote,news`)
      .then(r => r.json()).then(watchlistQuotesNews => {
        //console.log(watchlistQuotesNews);
        const quotes = [];
        let news = [];

        for(const each in watchlistQuotesNews) {
          quotes.push(watchlistQuotesNews[each].quote);
          news.push(watchlistQuotesNews[each].news);
        }

        if (news.length > 0) {
          news = news.reduce(
            (accumulator, currentValue) => accumulator.concat(currentValue),[]
          );
        }

        this.setState({
          watchlistQuotes: quotes,
          watchlistNews: news,
        })
      })

      fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.portfolio}&types=quote`)
      .then(r => r.json()).then(portfolioQuotes => {
        this.setState({ portfolioQuotes })
      })
    }.bind(this),3000);

    fetch('https://api.iextrading.com/1.0/stock/market/news/last/20')
    .then(r => r.json()).then(news => {
      this.setState({ news })
    })

    fetch('http://localhost:3001/api/v1/search_histories/1')
    .then(r => r.json()).then(searchHistory => {
      this.setState({ searchHistory: searchHistory.join(',') });
    })

    fetch('http://localhost:3001/api/v1/watchlists/1')
    .then(r => r.json()).then(watchlist => {
      this.setState({ watchlist: watchlist.join(',') });
    })

    fetch('http://localhost:3001/api/v1/portfolio_assets/1')
    .then(r => r.json()).then(portfolio => {
      this.setState({ portfolio: portfolio.join(',') });
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleSearch = keyword => {
    fetch(`https://api.iextrading.com/1.0/stock/${keyword}/batch?types=quote,news,chart&range=ytd`)
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
      this.setState({ quote: `No results for ${error.message}` })
    }.bind(this));

    if (this.state.portfolio.includes(keyword)) {
      this.setState({ inPortfolio: true })
    } else {
      this.setState({ inPortfolio: false })
    }

    if (this.state.watchlist.includes(keyword)) {
      this.setState({ inWatchlist: true })
    } else {
      this.setState({ inWatchlist: false })
    }

    fetch('http://localhost:3001/api/v1/search_histories', {
  		method: "POST",
  		headers: {
  			"Content-Type": "application/json"
  		},
  		body: JSON.stringify({ keyword })
  	})

    const historyArr = this.state.searchHistory.split(',');
    const newHistoryArr = historyArr.filter(history => history !== keyword);
    newHistoryArr.unshift(keyword);
    const newHistory = newHistoryArr.join(',');

    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${newHistory}&types=quote`)
    .then(r => r.json()).then(searchHistoryQuotes => {
      this.setState({
        searchHistory: newHistory,
        searchHistoryQuotes,
      })
    })
  }

  handleClick = (name, checked, symbol) => {
    const stateName = name.split('_')[0];
    const inStateName = 'in'+ stateName.slice(0,1).toUpperCase() + stateName.slice(1);
    let newState;

    if (checked) {
      fetch(`http://localhost:3001/api/v1/${name}s`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol })
      })

      newState = this.state[stateName] + ',' + symbol;
    } else {
      fetch(`http://localhost:3001/api/v1/${name}s/1`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol })
      })

      const stateArr = this.state[stateName].split(',');
      const index = stateArr.indexOf(symbol);
      const newStateArr = [...stateArr.slice(0, index), ...stateArr.slice(index+1)];
      newState = newStateArr.join(',');
    }

    this.setState({
      [inStateName]: !this.state[inStateName],
      [stateName]: newState,
    })
  }

  render() {
    // console.log(this.state.watchlistNews);
    return (
      <Router>
        <div>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={4}>
                <NavLink to='/' exact><h1 style={{marginTop: '5px'}}>Portfolio Manager and Hedger</h1></NavLink>
              </Grid.Column>
              <Grid.Column width={8}>
                <SearchBar search={this.handleSearch}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Column width={12}>
              <NavBar />
            </Grid.Column>

            <Route exact path='/' render={() => <Market indexes={this.state.indexes} news={this.state.news} searchHistory={this.state.searchHistoryQuotes} mostActive={this.state.mostActive} gainers={this.state.gainers} losers={this.state.losers} search={this.handleSearch}/>} />
            <Route exact path='/portfolio' render={() => <Portfolio indexes={this.state.indexes} portfolio={this.state.portfolioQuotes} search={this.handleSearch}/>} />
            <Route exact path='/watchlist' render={() => <Watchlist indexes={this.state.indexes} news={this.state.watchlistNews} watchlist={this.state.watchlistQuotes} search={this.handleSearch}/>} />
            <Route path='/quote' render={() => <Quote quote={this.state.quote} news={this.state.quoteNews} chart={this.state.quoteChart} click={this.handleClick} inPortfolio={this.state.inPortfolio} inWatchlist={this.state.inWatchlist}/>} />
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
