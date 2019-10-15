import React from 'react';
import { Table } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const QuoteTableRow = props => {
  const link = `/quote?symbol=${props.symbol}`;

  return (
    <Table.Row>
      <Table.Cell><NavLink to={link} onClick={() => props.search(props.symbol)}>{props.symbol}</NavLink></Table.Cell>
      <Table.Cell>{props.latestPrice}</Table.Cell>
      <Table.Cell>{props.change ? props.change.toFixed(2) : 0}</Table.Cell>
      <Table.Cell>{props.changePercent ? (props.changePercent*100).toFixed(2) : 0}%</Table.Cell>
    </Table.Row>
  )
}

export default QuoteTableRow;
