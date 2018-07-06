import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Watchlists from '../components/Watchlist/Watchlists';
import { Grid } from 'semantic-ui-react'

class Watchlist extends React.Component {
  render() {
    console.log(this.props.watchlist);
    // later use <Watchlists />
    const watchlist = this.props.watchlist.map(watch => <li>{watch}</li>)
    return (
      <React.Fragment>
        <Grid.Row>
          <IndexList indexes={this.props.indexes}/>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12}>
            <ul><h2>Your Watchlist:</h2>
              {watchlist}
            </ul>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12}>
            <h2>Your Watchlist News:</h2>
            <NewsList news={this.props.news}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Watchlist;
