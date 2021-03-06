import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Watchlists from '../components/Watchlist/Watchlists';
import UUID from 'uuid';
import { Grid, Table } from 'semantic-ui-react';
import ApiAdapter from '../adapters/ApiAdapter';
import { connect } from 'react-redux';
import requireAuth from '../hocs/requireAuth';

class Watchlist extends React.Component {
  state = {
    quotes: [],
    news: [],
    isLoading: true,
  }

  componentDidMount() {
    if (this.props.watchlist.length) this.fetchWatchlistQuotes();

    this.intervalID = setInterval(function(){
      if (this.props.watchlist.length) this.fetchWatchlistQuotes();
    }.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  
  fetchWatchlistQuotes = () => {
    fetch(ApiAdapter.getBatchQuotesNews(this.watchlistSymbols)).then(r => r.json()).then(watchlistQuotesNews => {
      const quotes = [];
      const news = [];

      for(const stock in watchlistQuotesNews) {
        quotes.push(watchlistQuotesNews[stock].quote);
        news.push(...watchlistQuotesNews[stock].news);  // flatten each news array
      }

      this.setState({
        quotes,
        news,
      }, () => {
        this.isLoaded();
      })
    })
  }

  get watchlistSymbols() {
    return this.props.watchlist.map(stock => stock.symbol);
  }

  isLoaded = () => {
    this.setState({
      isLoading: false,
    })
  }

  render()  {
    if (!this.props.watchlist.length) {
      return <h3>Please add stocks to you watchlist</h3>
    } if (this.state.isLoading) {
      return <img alt="Spinny GIF" src="https://cdn-images-1.medium.com/max/1600/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />
    } else {
      if (this.state.quotes.length) {
        const list = this.state.quotes.map(each => <Watchlists key={UUID()} {...each} />)
    
        return (
          <React.Fragment>
            <Grid.Row>
              <IndexList />
            </Grid.Row>
    
            <Grid.Row>
              <Grid.Column computer={14} mobile={15}>
                <h3>Your Watchlist:</h3>
                <div style={{overflow: 'auto'}}>
                  <Table unstackable color='blue'>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Symbol</Table.HeaderCell>
                        <Table.HeaderCell>Last Price</Table.HeaderCell>
                        <Table.HeaderCell>Change</Table.HeaderCell>
                        <Table.HeaderCell>% Change</Table.HeaderCell>
                        <Table.HeaderCell>Daily High</Table.HeaderCell>
                        <Table.HeaderCell>Daily Low</Table.HeaderCell>
                        <Table.HeaderCell>Daily Volume</Table.HeaderCell>
                        <Table.HeaderCell>Average Volume</Table.HeaderCell>
                        <Table.HeaderCell>Sector</Table.HeaderCell>
                        <Table.HeaderCell>Market Cap</Table.HeaderCell>
                        <Table.HeaderCell>P/E Ratio</Table.HeaderCell>
                        <Table.HeaderCell>52 Week High</Table.HeaderCell>
                        <Table.HeaderCell>52 Week Low</Table.HeaderCell>
                        <Table.HeaderCell>YTD Change</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
      
                    <Table.Body>
                      {list}
                    </Table.Body>
                  </Table>
                </div>
              </Grid.Column>
            </Grid.Row>

            {this.state.news.length ?
              <Grid.Row>
                <Grid.Column computer={14} mobile={15}>
                  <h3>Your Watchlist News:</h3>
                  <NewsList news={this.state.news} type='watchlist'/>
                </Grid.Column>
              </Grid.Row>
            : null}
            
          </React.Fragment>
        ) 
      } else {
        return <p>Please add stocks to your watchlist</p>
      }
    }
  }
}

const mapStateToProps = state => {
  return { watchlist: state.watchlist };
};

export default requireAuth(
  connect(mapStateToProps)(Watchlist),
);
