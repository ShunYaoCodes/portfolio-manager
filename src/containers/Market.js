import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import SearchHistory from '../components/Market/SearchHistory';
import { Grid, Icon } from 'semantic-ui-react'
import QuoteTable from '../components/Market/QuoteTable/QuoteTable';
import ApiAdapter from '../adapters/ApiAdapter';
import { connect } from 'react-redux';

class Market extends React.Component {
  state = {
    mostActive: [],
    gainers: [],
    losers: [],
    news: [],
  }

  componentDidMount() {
    this.fetchMarketData();
    this.fetchNews();

    this.intervalID = setInterval(function(){
      this.fetchMarketData();
    }.bind(this), 5000);

    this.intervalID1 = setInterval(function(){
      this.fetchNews();
    }.bind(this), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearInterval(this.intervalID1);
  }

  fetchMarketData = () => {
    this.fetchMostActive();
    this.fetchGainers();
    this.fetchLosers();
  }

  fetchMostActive = () => {
    fetch(ApiAdapter.mostActive()).then(r => r.json()).then(mostActive => {
      this.setState({ mostActive })
    })
  }

  fetchGainers = () => {
    fetch(ApiAdapter.gainers()).then(r => r.json()).then(gainers => {
      this.setState({ gainers })
    })
  }

  fetchLosers = () => {
    fetch(ApiAdapter.losers()).then(r => r.json()).then(losers => {
      this.setState({ losers })
    })
  }

  fetchNews = () => {
    const adapter = this.props.searchHistory.length ? ApiAdapter.getBatchNews(this.props.searchHistory) : ApiAdapter.getIndexNews();
    fetch(adapter).then(r => r.json()).then(news => {
      this.setState({ news })
    })
  }

  render() {
    return (

      <React.Fragment>
        <Grid.Row>
          <IndexList />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={10} mobile={8}>
            <h2><Icon name='newspaper outline'/> Market News:</h2>
            <NewsList news={this.state.news} type='market'/>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <SearchHistory />
            <QuoteTable tableName='Most Active' tableRows={this.state.mostActive} />
            <QuoteTable tableName='Gainers' tableRows={this.state.gainers} />
            <QuoteTable tableName='Losers' tableRows={this.state.losers} />
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { searchHistory: state.searchHistory.symbols };
};

export default connect(mapStateToProps)(Market);