import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { toggleList } from "../redux/actions";
import NewsList from '../components/NewsList';
import Asset from '../components/DetailQuote/Asset';
import { Grid } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import AuthAdapter from '../adapters/AuthAdapter';

class DetailQuote extends React.Component {
  /****
   * this.props consists of 
   *  {
   *    quote (Array), 
   *    news (Array), 
   *    chart (Array), 
   *    inWatchlist (Boolean), 
   *    inPortfolio (Boolean), 
   *  } 
   */
  
  handleClick = (event, data) => {
    // this.props.click(data.name, data.checked, this.props.quote.symbol)
    this.props.toggleList(data.name, data.checked, this.props.quote.symbol);
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
                  <div><Checkbox toggle checked onClick={this.handleClick} name="portfolio"/> Remove from your portfolio</div>
                  :
                  <div><Checkbox toggle onClick={this.handleClick} name="portfolio"/> Add to your portfolio</div>
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
  // const { visibilityFilter } = state;
  // const todos = getTodosByVisibilityFilter(state, visibilityFilter);
  // return { todos };
  // return { activeFilter: state.visibilityFilter };
};

export default withRouter(connect(
  mapStateToProps,
  { toggleList }
)(DetailQuote));