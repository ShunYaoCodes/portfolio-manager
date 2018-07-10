import React from 'react';
import SearchedItem from './SearchedItem';
import UUID from 'uuid';
import { Table } from 'semantic-ui-react';

const SearchedList = props => {
  //console.log(props.searchHistory);
  let list = [];

  if (Object.keys(props.searchHistory).length > 0) {
    let count = 0;
    for(const quote in props.searchHistory) {
      if (count > 9) break;
      list.push(<SearchedItem key={UUID()} quote={props.searchHistory[quote].quote} search={props.search}/>);
      count++;
    }
  }

  return (
    <div>
      <h3>Your Recent Search:</h3>
      <Table color='blue' columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>Last Price</Table.HeaderCell>
            <Table.HeaderCell>Change</Table.HeaderCell>
            <Table.HeaderCell>% Change</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list}
        </Table.Body>
      </Table>
    </div>
  )
}

export default SearchedList;
