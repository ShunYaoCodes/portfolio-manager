import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Watchlists from '../components/Watchlist/Watchlists';
import { Grid } from 'semantic-ui-react'

class Watchlist extends React.Component {
  render() {
    // console.log(this.state.news);
    // console.log(this.state.indexes)
    return (
      <React.Fragment>
        <Grid.Row>
          <IndexList indexes={this.props.indexes}/>
        </Grid.Row>

        <Grid.Row>
          <Watchlists />
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12}>
            <NewsList news={this.props.news}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Watchlist;
