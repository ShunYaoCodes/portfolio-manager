import React from 'react';
import { NavLink } from 'react-router-dom'
import { Table, Radio } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { updatePositionType, fetchStockDetail } from "../../redux/actions";

const Positions = ({id, position_type, stats, symbol, dispatch}) => {
  const link = `/detail?symbol=${symbol}`;
  const divDate = stats.exDividendDate;

  const handlePositionTypeChange = (e, { value }) => {
    dispatch(updatePositionType(id, value));
  }

  const handleClick = event => {
    dispatch(fetchStockDetail(event.target.name));
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Radio label='Long' value='Long' defaultChecked={position_type === 'Long'} onChange={handlePositionTypeChange}/>
        <Radio label='Short' value='Short' defaultChecked={position_type === 'Short'} onChange={handlePositionTypeChange}/>
      </Table.Cell>
      <Table.Cell><NavLink to={link} name={symbol} onClick={handleClick}>{symbol}</NavLink></Table.Cell>
      <Table.Cell>{stats.beta.toFixed(2)}</Table.Cell>
      <Table.Cell>{stats.shortInterest}</Table.Cell>
      <Table.Cell>{stats.shortDate}</Table.Cell>
      <Table.Cell>{stats.dividendRate}({stats.dividendYield ? stats.dividendYield.toFixed(2) : 'N/A'}%)</Table.Cell>
      <Table.Cell>{typeof(divDate) === 'string' ? divDate.split(' ')[0] : 'N/A'}</Table.Cell>
      <Table.Cell>{stats.ttmEPS.toFixed(2)}</Table.Cell>
      <Table.Cell>{(stats.day5ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(stats.day30ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(stats.month3ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(stats.month6ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(stats.year1ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(stats.year2ChangePercent*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(stats.year5ChangePercent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps
)(Positions);
