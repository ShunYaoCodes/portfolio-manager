import React from 'react';
import { Table } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStockDetail } from '../../../redux/actions';

const QuoteTableRow = ({ symbol, latestPrice, change, changePercent, dispatch }) => {
  const link = `/detail?symbol=${symbol}`;

  const handleClick = event => {
    dispatch(fetchStockDetail(event.target.name));
  };

  return (
    <Table.Row>
      <Table.Cell><NavLink to={link} name={symbol} onClick={handleClick}>{symbol}</NavLink></Table.Cell>
      <Table.Cell>{latestPrice}</Table.Cell>
      <Table.Cell>{change ? change.toFixed(2) : 0}</Table.Cell>
      <Table.Cell>{changePercent ? (changePercent*100).toFixed(2) : 0}%</Table.Cell>
    </Table.Row>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps
)(QuoteTableRow);
