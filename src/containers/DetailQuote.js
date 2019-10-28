import React from 'react';
import { connect } from "react-redux";
import { toggleStatus } from "../redux/actions";
import NewsList from '../components/NewsList';
import Asset from '../components/DetailQuote/Asset';
import { Grid } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import AuthAdapter from '../adapters/AuthAdapter';

class DetailQuote extends React.Component {
  /****
   * this.props consists of 
   *  {
   *    quote (Object), 
   *    news (Array), 
   *    chart (Array), 
   *    inWatchlist (Boolean), 
   *    inPortfolio (Boolean), 
   *    error (String),
   *  } 
   */
  
  handleToggle = (event, { name, checked }) => {
    this.props.dispatch(toggleStatus(name, checked, this.props.quote.symbol));
  }

  render() {
    if (Object.keys(this.props.quote).length && !this.props.error) {
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
                  <div><Checkbox toggle checked onClick={this.handleToggle} name="watchlist"/>Remove from your watchlist</div>
                  :
                  <div><Checkbox toggle onClick={this.handleToggle} name="watchlist"/> Add to your watchlist</div>
                )
                :
                <p>Sign in to add to your watchlist</p>
              }
            </Grid.Column>

            <Grid.Column width={7}>
              {AuthAdapter.loggedIn() ? 
                (this.props.inPortfolio ?
                  <div><Checkbox toggle checked onClick={this.handleToggle} name="portfolio"/> Remove from your portfolio</div>
                  :
                  <div><Checkbox toggle onClick={this.handleToggle} name="portfolio"/> Add to your portfolio</div>
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

const mapStateToProps = state => {
  const { stockDetail } = state;
  return { ...stockDetail };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailQuote);
