import React from 'react';
import { Table } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const SearchedItem = props => {
  const link = `/quote?symbol=${props.quote.symbol}`;

  return (
    <Table.Row>
      <Table.Cell><NavLink to={link} onClick={() => props.search(props.quote.symbol)}>{props.quote.symbol}</NavLink></Table.Cell>
      <Table.Cell>{props.quote.latestPrice}</Table.Cell>
      <Table.Cell>{props.quote.change.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.quote.changePercent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default SearchedItem;
