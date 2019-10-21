import { connect } from 'react-redux';
import React from 'react';
import Index from './Index';
import UUID from 'uuid';

const IndexList = props => {
  if (props.indexQuotes && props.indexQuotes.length) {
    const indexList = props.indexQuotes.map(index => <Index key={UUID()} {...index} search={props.search}/>)
    return (
      <React.Fragment>
        {indexList}
      </React.Fragment>
    )
  } else {
    return (
      <div></div>
    )
  }

}

const mapStateToProps = state => {
  const { indexQuotes } = state;
  return indexQuotes;
};

export default connect(mapStateToProps)(IndexList);
