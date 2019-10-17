import React from 'react';
//import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Asset from '../components/Quote/Asset';
import { Grid } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import AuthAdapter from '../adapters/AuthAdapter';

class Quote extends React.Component {
  // this.props consists of {quote, news, chart} or {error}
  
  handleClick = (event, data) => {
    this.props.click(data.name, data.checked, this.props.quote.symbol)
  }

  render() {
    if (this.props.quote && !this.props.error) {
      return (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column width={14}>
              <h2>{this.props.quote.companyName} ({this.props.quote.symbol})</h2>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={7}>
              {AuthAdapter.loggedIn() ? 
                (this.props.inWatchlist ?
                  <div><Checkbox toggle checked onClick={this.handleClick} name="watchlist"/>Remove from your watchlist</div>
                  :
                  <div><Checkbox toggle onClick={this.handleClick} name="watchlist"/> Add to your watchlist</div>
                )
                :
                <p>Sign in to add to your watchlist</p>
              }
            </Grid.Column>

            <Grid.Column width={7}>
              {AuthAdapter.loggedIn() ? 
                (this.props.inPortfolio ?
                  <div><Checkbox toggle checked onClick={this.handleClick} name="portfolio_asset"/> Remove from your portfolio</div>
                  :
                  <div><Checkbox toggle onClick={this.handleClick} name="portfolio_asset"/> Add to your portfolio</div>
                )
                :
                <p>Sign in to add to your portfolio</p>
              }
            </Grid.Column>
          </Grid.Row>

          <Asset {...this.props}/>

          <Grid.Row>
            <Grid.Column width={14}>
              <h2>{this.props.quote.symbol} News:</h2>
              <NewsList news={this.props.news}  type='detailQuote'/>
            </Grid.Column>
          </Grid.Row>
        </React.Fragment>
      )
    } else {
      return (
        <Grid.Row>
          <h3>{this.props.error}</h3>
        </Grid.Row>
      )
    }
  }
}

export default Quote;
