import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Table } from 'semantic-ui-react'

const SearchedItem = props => {
  //console.log(props);
  return (
    <Table.Row>
      <Table.Cell>{props.quote.symbol}</Table.Cell>
      <Table.Cell>{props.quote.latestPrice}</Table.Cell>
      <Table.Cell>{(props.quote.latestPrice - props.quote.close).toFixed(2)}</Table.Cell>
      <Table.Cell>{((props.quote.latestPrice - props.quote.close)/props.quote.close*100).toFixed(2)}{'%'}</Table.Cell>
    </Table.Row>
  )
}

export default SearchedItem;
