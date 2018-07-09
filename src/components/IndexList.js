import React from 'react';
import Index from './Index';
import UUID from 'uuid';
import { Grid } from 'semantic-ui-react'

const IndexList = props => {
  const indexList = props.indexes.map(index => <Index key={UUID()} {...index} />)
  return (
    <React.Fragment>
      {indexList}
    </React.Fragment>
  )
}

export default IndexList;
