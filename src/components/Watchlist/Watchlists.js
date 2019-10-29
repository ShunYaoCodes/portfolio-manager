import React from 'react';
import { NavLink } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchStockDetail } from "../../redux/actions";

const Watchlists = props => {
  const link = `/detail?symbol=${props.symbol}`;

  const handleClick = event => {
    props.dispatch(fetchStockDetail(event.target.name));
  };

  return (
    <Table.Row>
      <Table.Cell><NavLink to={link} name={props.symbol} onClick={handleClick}>{props.symbol}</NavLink></Table.Cell>
      <Table.Cell>{props.latestPrice}</Table.Cell>
      <Table.Cell>{props.change ? props.change.toFixed(2) : 'N/A'}</Table.Cell>
      <Table.Cell>{props.changePercent ? (props.changePercent*100).toFixed(2) : 'N/A'}%</Table.Cell>
      <Table.Cell>{props.high}</Table.Cell>
      <Table.Cell>{props.low}</Table.Cell>
      <Table.Cell>{props.latestVolume}</Table.Cell>
      <Table.Cell>{props.avgTotalVolume}</Table.Cell>
      <Table.Cell>{props.sector}</Table.Cell>
      <Table.Cell>{props.marketCap}</Table.Cell>
      <Table.Cell>{props.peRatio}</Table.Cell>
      <Table.Cell>{props.week52High}</Table.Cell>
      <Table.Cell>{props.week52Low}</Table.Cell>
      <Table.Cell>{props.ytdChange ? (props.ytdChange*100).toFixed(2) : 'N/A'}%</Table.Cell>
    </Table.Row>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps
)(Watchlists);
