import React from 'react';
import Stats from './Stats.js';
import Chart from './Chart.js';

import { Grid, Image, Divider } from 'semantic-ui-react'

const Asset = props => {
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={12}>
          <Chart />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={12}>
          <h2>{props.symbol ? props.symbol : null} Summary:</h2>
          <Stats {...props}/>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )
}

export default Asset;
