import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import SearchedList from '../components/Market/SearchedList';
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
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Market;
