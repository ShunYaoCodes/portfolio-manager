import React from 'react';
import Index from './Index';
import UUID from 'uuid';

const IndexList = props => {
  const indexList = props.indexes.map(index => <Index key={UUID()} {...index} search={props.search}/>)
  return (
    <React.Fragment>
      {indexList}
    </React.Fragment>
  )
}

export default IndexList;
