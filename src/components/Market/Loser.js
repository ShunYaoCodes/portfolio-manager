import React from 'react';
import { Table } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Loser = props => {
  const link = `/quote?symbol=${props.symbol}`;

  return (
    <Table.Row>
      <Table.Cell><NavLink to={link} onClick={() => props.search(props.symbol)}>{props.symbol}</NavLink></Table.Cell>
      <Table.Cell>{props.latestPrice}</Table.Cell>
      <Table.Cell>{props.change.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.changePercent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default Loser;
