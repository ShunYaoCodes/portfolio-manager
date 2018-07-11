import React from 'react';
import { NavLink } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Positions = props => {
  const link = `/quote?symbol=${props.symbol}`;
  const divDate = props.exDividendDate;

  return (
    <Table.Row>
      <Table.Cell><NavLink to={link} onClick={() => props.search(props.symbol)}>{props.symbol}</NavLink></Table.Cell>
      <Table.Cell>{props.beta}</Table.Cell>
      <Table.Cell>{props.shortInterest}</Table.Cell>
      <Table.Cell>{props.shortDate}</Table.Cell>
      <Table.Cell>{props.dividendRate}({props.dividendYield.toFixed(2)}%)</Table.Cell>
      <Table.Cell>{typeof(divDate) === 'string' ? divDate.split(' ')[0] : 'N/A'}</Table.Cell>
      <Table.Cell>{props.ttmEPS.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.day5ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.day30ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.month1ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.month3ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.month6ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.ytdChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.year1ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.year2ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.year5ChangePercent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default Positions;
