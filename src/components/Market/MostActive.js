import React from 'react';
import { Table } from 'semantic-ui-react'

const MostActive = props => {
  return (
    <Table.Row>
      <Table.Cell>{props.symbol}</Table.Cell>
      <Table.Cell>{props.latestPrice}</Table.Cell>
      <Table.Cell>{props.change.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.changePercent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default MostActive;
