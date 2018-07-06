import React from 'react';

import { Table } from 'semantic-ui-react'

const Positions = props => {
  return (
    <Table.Row>
      <Table.Cell>{props.quote.symbol}</Table.Cell>
      <Table.Cell>{props.quote.latestPrice}</Table.Cell>
      <Table.Cell>{props.quote.change.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.quote.changePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{props.quote.high}</Table.Cell>
      <Table.Cell>{props.quote.low}</Table.Cell>
      <Table.Cell>{props.quote.latestVolume}</Table.Cell>
      <Table.Cell>{props.quote.avgTotalVolume}</Table.Cell>
      <Table.Cell>{props.quote.sector}</Table.Cell>
      <Table.Cell>{props.quote.marketCap}</Table.Cell>
      <Table.Cell>{props.quote.peRatio}</Table.Cell>
      <Table.Cell>{props.quote.week52High}</Table.Cell>
      <Table.Cell>{props.quote.week52Low}</Table.Cell>
      <Table.Cell>{(props.quote.ytdChange*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default Positions;
