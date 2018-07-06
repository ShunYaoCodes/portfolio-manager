import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Table } from 'semantic-ui-react'

const SearchedItem = props => {
  return (
    <Table.Row>
      <Table.Cell>{props.quote.symbol}</Table.Cell>
      <Table.Cell>{props.quote.latestPrice}</Table.Cell>
      <Table.Cell>{props.quote.change.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.quote.changePercent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default SearchedItem;
