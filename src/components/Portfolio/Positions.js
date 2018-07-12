import React from 'react';
import { NavLink } from 'react-router-dom'
import { Table, Radio } from 'semantic-ui-react'

const Positions = props => {
  const handleChange = (e, { value }) => {
    props.type(props.stats.symbol, value)
  }

  const link = `/quote?symbol=${props.stats.symbol}`;
  const divDate = props.stats.exDividendDate;

  return (
    <Table.Row>
      <Table.Cell>
        <Radio label='Long' value='Long' defaultChecked={props.position_type === 'Long'} onChange={handleChange}/>
        <Radio label='Short' value='Short' defaultChecked={props.position_type === 'Short'} onChange={handleChange}/>
      </Table.Cell>
      <Table.Cell><NavLink to={link} onClick={() => props.search(props.stats.symbol)}>{props.stats.symbol}</NavLink></Table.Cell>
      <Table.Cell>{props.stats.beta}</Table.Cell>
      <Table.Cell>{props.stats.shortInterest}</Table.Cell>
      <Table.Cell>{props.stats.shortDate}</Table.Cell>
      <Table.Cell>{props.stats.dividendRate}({props.stats.dividendYield.toFixed(2)}%)</Table.Cell>
      <Table.Cell>{typeof(divDate) === 'string' ? divDate.split(' ')[0] : 'N/A'}</Table.Cell>
      <Table.Cell>{props.stats.ttmEPS.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.stats.day5ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.day30ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.month1ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.month3ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.month6ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.ytdChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.year1ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.year2ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.stats.year5ChangePercent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default Positions;
