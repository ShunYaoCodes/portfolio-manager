import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import SearchHistory from '../components/Market/SearchHistory';
import { Grid, Icon } from 'semantic-ui-react'
import QuoteTable from '../components/Market/QuoteTable/QuoteTable';

class Market extends React.Component {
  render() {
    //console.log(this.props.searchHistory);
    // console.log(this.state.indexes)
    return (

      <React.Fragment>
        <Grid.Row>
          <IndexList indexes={this.props.indexes} search={this.props.search}/>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={10} mobile={8}>
            <h2><Icon name='newspaper outline'/> Market News:</h2>
            <NewsList news={this.props.news} type='market'/>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <SearchHistory searchHistory={this.props.searchHistory} search={this.props.search}/>
            <QuoteTable tableName='Most Active' tableRows={this.props.mostActive} search={this.props.search}/>
            <QuoteTable tableName='Gainers' tableRows={this.props.gainers} search={this.props.search}/>
            <QuoteTable tableName='Losers' tableRows={this.props.losers} search={this.props.search}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Market;
