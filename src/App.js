import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import Market from './containers/Market'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Portfolio from './containers/Portfolio'
import Watchlist from './containers/Watchlist'
import Quote from './containers/Quote'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

//import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
  state = {
    news: [],
    indexes: [],
    quote: null,
    searchHistory: [],
  }

  componentDidMount() {
    this.intervalID = setInterval(function(){
      fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols=spy,dia,qqq&types=quote')
      .then(r => r.json()).then(indexes => {
        const indexArr = [];

        for(const index in indexes) {
          indexArr.push(indexes[index].quote)
        }
        //console.log(indexArr);
        this.setState({ indexes: indexArr })
      })
    }.bind(this),3000);

    fetch('https://api.iextrading.com/1.0/stock/market/news/10')
    .then(r => r.json()).then(news => {
      this.setState({ news })
    })

    fetch('http://localhost:3001/api/v1/search_histories/1')
    .then(r => r.json()).then(searchHistory => {
      console.log(searchHistory);
      this.setState({
        searchHistory
      })
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleSearch = keyword => {
    fetch(`https://api.iextrading.com/1.0/stock/${keyword}/batch?types=quote,news`)
    .then(r => r.json()).then(item => {
      //console.log(item);
      this.setState({
        quote: item.quote,
        news: item.news,
      })
    })

    fetch('http://localhost:3001/api/v1/search_histories', {
  		method: "POST",
  		headers: {
  			"Content-Type": "application/json"
  		},
  		body: JSON.stringify({
  			keyword
  		})
  	})

    fetch('http://localhost:3001/api/v1/search_histories/1')
    .then(r => r.json()).then(searchHistory => {
      this.setState({
        searchHistory
      })
    })
  }

  handleClick = (checked, symbol) => {
    if (checked) {
      // fetch('http://localhost:3001/api/v1/search_histories', {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     keyword
      //   })
      } else {
      // fetch('http://localhost:3001/api/v1/search_histories', {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     keyword
      //   })
      // })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={6}>
                <NavLink to='/' exact onClick={() => window.location.reload()}><h1>Portfolio Manager and Hedger</h1></NavLink>
              </Grid.Column>
              <Grid.Column width={6}>
                <SearchBar search={this.handleSearch}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Column width={12}>
              <NavBar />
            </Grid.Column>

            <Route exact path='/' render={() => <Market indexes={this.state.indexes} news={this.state.news} searchHistory={this.state.searchHistory}/>} />
            <Route exact path='/portfolio' render={() => <Portfolio indexes={this.state.indexes} news={this.state.news} />} />
            <Route exact path='/watchlist' render={() => <Watchlist indexes={this.state.indexes} news={this.state.news} />} />
            <Route exact path='/quote' render={() => <Quote quote={this.state.quote} news={this.state.news} click={this.handleClick}/>} />
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
