import React from 'react';
import { connect } from "react-redux";
import { toggleStatus } from "../redux/actions";
import NewsList from '../components/NewsList';
import Asset from '../components/StockDetail/Asset';
import { Grid } from 'semantic-ui-react';
import { fetchStockDetail } from '../redux/actions';
import { Checkbox } from 'semantic-ui-react';

class StockDetail extends React.Component {
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
    if (this.props.error) {
      return (
        <Grid.Row>
          <h3>{this.props.error}</h3>
        </Grid.Row>
      )
    } else if (!Object.keys(this.props.quote).length) {
      const symbol = window.location.search.replace("?symbol=" , ""); // when user refreshes page or enters url directly
      this.props.dispatch(fetchStockDetail(symbol));
      return <img alt="Spinny GIF" src="https://cdn-images-1.medium.com/max/1600/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />
    } else {
      return (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column computer={14} mobile={15}>
              <h2>{this.props.quote.companyName} ({this.props.quote.symbol})</h2>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={7}>
              {this.props.loggedIn ? 
                <div>
                  <Checkbox toggle checked={this.props.inWatchlist} onClick={this.handleToggle} name="watchlist"/>
                  {this.props.inWatchlist ? " Remove from your watchlist" : " Add to your watchlist"}
                </div>
                :
                <p>Sign in to add to your watchlist</p>
              }
            </Grid.Column>

            <Grid.Column width={7}>
              {this.props.loggedIn ? 
                <div>
                  <Checkbox toggle checked={this.props.inPortfolio} onClick={this.handleToggle} name="portfolio"/>
                  {this.props.inPortfolio ? " Remove from your portfolio" : " Add to your portfolio"}
                </div>
                :
                <p>Sign in to add to your portfolio</p>
              }
            </Grid.Column>
          </Grid.Row>

          <Asset {...this.props}/>

          <Grid.Row>
            <Grid.Column computer={14} mobile={15}>
              <h2>{this.props.quote.symbol} News:</h2>
              <NewsList news={this.props.news}  type='detail'/>
            </Grid.Column>
          </Grid.Row>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  const { stockDetail, auth } = state;
  const { token } = auth;
  return { 
    ...stockDetail, 
    loggedIn: !!token,
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockDetail);