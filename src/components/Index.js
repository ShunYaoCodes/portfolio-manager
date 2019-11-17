import React from 'react';
import { NavLink } from 'react-router-dom'
import { Grid, Icon, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchStockDetail } from '../redux/actions';

const Index = props => {
  const link = `/detail?symbol=${props.symbol}`;

  let symbol;
  switch(props.symbol) {
    case 'SPY':
      symbol = 'S&P 500';
      break;
    case 'DIA':
      symbol = 'DOW 30';
      break;
    case 'QQQ':
      symbol = 'NASDAQ';
      break;
    case 'IWM':
      symbol = 'RUSSELL 2K';
      break;
    case 'VXX':
      symbol = 'VIX';
      break;
    default:
      return symbol;
  }

  const handleClick = event => {
    props.dispatch(fetchStockDetail(event.target.name));
  };

  const indexes = props.change >= 0 ?
    <Segment inverted color={symbol === 'VIX' ? 'red' : 'green'}>
      <NavLink style={{color: 'white'}} to={link} name={props.symbol} onClick={handleClick}>
        <p>{symbol}</p>
        <p>{props.latestPrice}&nbsp;&nbsp;+{props.change}</p>
        <p><Icon className='mobile-hide' name='triangle up' />&nbsp;(+{(props.changePercent*100).toFixed(2)}%)</p>
      </NavLink>
    </Segment>  
    :
    <Segment inverted color={symbol === 'VIX' ? 'green' : 'red'}>  
      <NavLink style={{color: 'white'}} to={link} name={props.symbol} onClick={handleClick}>
        <p>{symbol}</p>
        <p>{props.latestPrice}&nbsp;&nbsp;{props.change}</p>
        <p><Icon name='triangle down' />&nbsp;({(props.changePercent*100).toFixed(2)}%)</p>
      </NavLink>
    </Segment>    

  return (
    <Grid.Column textAlign='right' computer={2} mobile={3}>
      {indexes}
    </Grid.Column>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps
)(Index);
