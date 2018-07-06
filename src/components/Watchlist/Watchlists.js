import React from 'react';

import { Table } from 'semantic-ui-react'

const Watchlists = props => {
  //console.log(props);
  return (
    <Table.Row>
      <Table.Cell>{props.symbol}</Table.Cell>
      <Table.Cell>{props.latestPrice}</Table.Cell>
      <Table.Cell>{props.change.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.changePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{props.high}</Table.Cell>
      <Table.Cell>{props.low}</Table.Cell>
      <Table.Cell>{props.latestVolume}</Table.Cell>
      <Table.Cell>{props.avgTotalVolume}</Table.Cell>
      <Table.Cell>{props.sector}</Table.Cell>
      <Table.Cell>{props.marketCap}</Table.Cell>
      <Table.Cell>{props.peRatio}</Table.Cell>
      <Table.Cell>{props.week52High}</Table.Cell>
      <Table.Cell>{props.week52Low}</Table.Cell>
      <Table.Cell>{(props.ytdChange*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default Watchlists;
