import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Positions from '../components/Portfolio/Positions';
import Stats from '../components/Portfolio/Stats';
import { Grid } from 'semantic-ui-react'

class Portfolio extends React.Component {
  render() {
    console.log(this.props.portfolio);
    // later use <Positions />
    const portfolio = this.props.portfolio.map(port => <li>{port}</li>)
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={12}>
            <ul><h2>Your Portfolio:</h2>
              {portfolio}
            </ul>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={12}>
            <Stats />
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Portfolio;
