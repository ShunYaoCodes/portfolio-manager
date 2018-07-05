import React from 'react';
import SearchedItem from './SearchedItem';
import UUID from 'uuid';

const SearchedList = props => {
  //console.log(props.searchHistory);
  //const list = props.searchHistory.map(each => <SearchedItem key={UUID()} asset={each.asset}/>)
  const list = props.searchHistory.map(each => <li>{each}</li>)
  return (
    <ul> <h3>Your Recent Search:</h3>
      {list}
    </ul>
  )
}

export default SearchedList;
