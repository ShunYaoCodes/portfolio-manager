import React from 'react';
import SearchedItem from './SearchedItem';
import UUID from 'uuid';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

const SearchedList = props => {
  //console.log(props.searchHistory);
  //const list = props.searchHistory.map(each => <SearchedItem key={UUID()} asset={each.asset}/>)
  const  = props.searchHistory.map(each => <li>{each}</li>)
  return (
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
  )
}

export default SearchedList;
