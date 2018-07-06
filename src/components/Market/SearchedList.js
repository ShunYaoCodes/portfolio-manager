import React from 'react';
import SearchedItem from './SearchedItem';
import UUID from 'uuid';
import { Table } from 'semantic-ui-react';

const SearchedList = props => {
  //console.log(props.searchHistory);
  let list = [];

  if (Object.keys(props.searchHistory) !== []) {
    for(const quote in props.searchHistory) {
      list.push(<SearchedItem quote={props.searchHistory[quote].quote} />)
    }
  }

  return (
    <div>
      <h3>Your Recent Search:</h3>
      <Table>
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
