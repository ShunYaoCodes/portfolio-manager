import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Positions from '../components/Portfolio/Positions';
import Stats from '../components/Portfolio/Stats';
import { Grid } from 'semantic-ui-react'

class Portfolio extends React.Component {
  render() {
    // console.log(this.state.news);
    // console.log(this.state.indexes)
    return (
      <React.Fragment>
        <Grid.Row>
          <Positions />
        </Grid.Row>

        <Grid.Row>
          <Stats />
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Portfolio;
