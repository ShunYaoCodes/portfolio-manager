import React from 'react';
//import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Asset from '../components/Quote/Asset';
import { Grid } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'

class Quote extends React.Component {
  handleClick = (event, data) => {
    this.props.click(data.name, data.checked, this.props.quote.symbol)
  }

  render() {
    //console.log(this.props.inWatchlist);
    //console.log(this.props.quote.symbol);
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={6}>
            {this.props.inWatchlist ?
              <div><Checkbox toggle checked onClick={this.handleClick} name="watchlist"/>Remove from your watchlist</div>
              :
              <div><Checkbox toggle onClick={this.handleClick} name="watchlist"/> Add to your watchlist</div>
            }
          </Grid.Column>

          <Grid.Column width={6}>
            {this.props.inPortfolio ?
              <div><Checkbox toggle checked onClick={this.handleClick} name="portfolio_asset"/> Remove from your portfolio</div>
              :
              <div><Checkbox toggle onClick={this.handleClick} name="portfolio_asset"/> Add to your portfolio</div>
            }
          </Grid.Column>
        </Grid.Row>
        <h2>{this.props.quote ? this.props.quote.symbol : null}</h2>
        <Asset />

        <Grid.Row>
          <Grid.Column width={12}>
            <NewsList news={this.props.news}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Quote;
