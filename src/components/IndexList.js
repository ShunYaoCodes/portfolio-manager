import { connect } from 'react-redux';
import React from 'react';
import Index from './Index';
import UUID from 'uuid';

const IndexList = ({indexQuotes}) => {
  if (indexQuotes && indexQuotes.length) {
    const indexList = indexQuotes.map(index => <Index key={UUID()} {...index} />)
    return (
      <>
        {indexList}
      </>
    )
  } else {
    return (
      <></>
    )
  }

}

const mapStateToProps = state => {
  const { indexQuotes } = state;
  return indexQuotes;
};

export default connect(mapStateToProps)(IndexList);
