import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Watchlists from '../components/Watchlist/Watchlists';
import UUID from 'uuid';
import { Grid, Table } from 'semantic-ui-react';
import AuthAdapter from '../adapters/AuthAdapter';
import ApiAdapter from '../adapters/ApiAdapter';
import { connect } from 'react-redux';
import { fetchWatchlist } from "../redux/actions";

class Watchlist extends React.Component {
  state = {
    quotes: [],
    news: [],
  }

  componentDidMount() {
    if (AuthAdapter.loggedIn()) this.props.dispatch(fetchWatchlist());
    if (this.props.watchlist.length) this.fetchWatchlistQuotes();

    this.intervalID = setInterval(function(){
      if (this.props.watchlist.length) this.fetchWatchlistQuotes();
    }.bind(this),3000);
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
      })
    })
  }

  get watchlistSymbols() {
    return this.props.watchlist.map(stock => stock.symbol);
  }

  render()  {
    if (AuthAdapter.loggedIn()) {
      if (this.state.quotes.length) {
        const list = this.state.quotes.map(each => <Watchlists key={UUID()} {...each} />)
    
        return (
          <React.Fragment>
            <Grid.Row>
              <IndexList />
            </Grid.Row>
    
            <Grid.Row>
              <Grid.Column width={14}>
                <h3>Your Watchlist:</h3>
                <Table color='blue'>
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
              </Grid.Column>
            </Grid.Row>

            {this.state.news.length ?
              <Grid.Row>
                <Grid.Column width={14}>
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
    } else {
      return <p>Please sign in to see your watchlist</p>
    }
  }
}

const mapStateToProps = state => {
  return { watchlist: state.watchlist };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Watchlist);
