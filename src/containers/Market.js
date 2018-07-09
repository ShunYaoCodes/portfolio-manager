import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import SearchedList from '../components/Market/SearchedList';
import MostActiveList from '../components/Market/MostActiveList';
import GainersList from '../components/Market/GainersList';
import LosersList from '../components/Market/LosersList';
import { Grid } from 'semantic-ui-react'

class Market extends React.Component {
  render() {
    //console.log(this.props.searchHistory);
    // console.log(this.state.indexes)
    return (

      <React.Fragment>
        <Grid.Row>
          <IndexList indexes={this.props.indexes}/>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={9}>
            <NewsList news={this.props.news}/>
          </Grid.Column>
          <Grid.Column width={3}>
            <SearchedList searchHistory={this.props.searchHistory}/>
            <MostActiveList mostActive={this.props.mostActive}/>
            <GainersList gainers={this.props.gainers}/>
            <LosersList losers={this.props.mostActive}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Market;
