import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import SearchedList from '../components/Market/SearchedList';
import MostActiveList from '../components/Market/MostActiveList';
import GainersList from '../components/Market/GainersList';
import LosersList from '../components/Market/LosersList';
import { Grid, Icon } from 'semantic-ui-react'

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
            <SearchedList searchHistory={this.props.searchHistory} search={this.props.search}/>
            <MostActiveList mostActive={this.props.mostActive} search={this.props.search}/>
            <GainersList gainers={this.props.gainers} search={this.props.search}/>
            <LosersList losers={this.props.mostActive} search={this.props.search}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Market;
