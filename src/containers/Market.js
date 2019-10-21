import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import SearchHistory from '../components/Market/SearchHistory';
import { Grid, Icon } from 'semantic-ui-react'
import QuoteTable from '../components/Market/QuoteTable/QuoteTable';
import ApiAdapter from '../adapters/ApiAdapter';
import AppAdapter from '../adapters/AppAdapter';

class Market extends React.Component {
  state = {
    mostActive: [],
    gainers: [],
    losers: [],
    news: [],
  }

  componentDidMount() {
    this.intervalID = setInterval(function(){
      this.getMostActive();
      this.getGainers();
      this.getLosers();
    }.bind(this),3000);

    this.getNews();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearInterval(this.intervalID1);
  }

  getMostActive = () => {
    fetch(ApiAdapter.mostActive()).then(r => r.json()).then(mostActive => {
      this.setState({ mostActive })
    })
  }

  getGainers = () => {
    fetch(ApiAdapter.gainers()).then(r => r.json()).then(gainers => {
      this.setState({ gainers })
    })
  }

  getLosers = () => {
    fetch(ApiAdapter.losers()).then(r => r.json()).then(losers => {
      this.setState({ losers })
    })
  }

  getNews = () => {
    const adapter = AppAdapter.searchHistory().length ? ApiAdapter.getBatchNews(AppAdapter.searchHistory()) : ApiAdapter.getIndexNews();

    fetch(adapter).then(r => r.json()).then(news => {
      this.setState({ news })
    })

    this.intervalID1 = setInterval(function(){
      fetch(adapter).then(r => r.json()).then(news => {
        this.setState({ news })
      })
    }.bind(this),20000);
  }

  render() {
    return (

      <React.Fragment>
        <Grid.Row>
          <IndexList search={this.props.search}/>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={10} mobile={8}>
            <h2><Icon name='newspaper outline'/> Market News:</h2>
            <NewsList news={this.state.news} type='market'/>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <SearchHistory searchHistory={this.props.searchHistory} search={this.props.search}/>
            <QuoteTable tableName='Most Active' tableRows={this.state.mostActive} search={this.props.search}/>
            <QuoteTable tableName='Gainers' tableRows={this.state.gainers} search={this.props.search}/>
            <QuoteTable tableName='Losers' tableRows={this.state.losers} search={this.props.search}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Market;