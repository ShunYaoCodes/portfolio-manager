import React from 'react';

import { Grid, Image, Divider } from 'semantic-ui-react'

const Index = props => {
  //console.log(props)
  return (
    <React.Fragment>
      <Grid.Column width={2}>
       <img src='/images/wireframe/media-paragraph.png' />
      </Grid.Column>
      <Grid.Column width={2}>
        <p>{props.symbol}</p>
        <p>{props.price}</p>
      </Grid.Column>
    </React.Fragment>
  )
}

export default Index;
