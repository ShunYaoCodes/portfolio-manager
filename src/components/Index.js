import React from 'react';
import { NavLink } from 'react-router-dom'
import { Grid, Icon } from 'semantic-ui-react'

const Index = props => {
  const link = `/quote?symbol=${props.symbol}`;

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

  const vix = <React.Fragment>
              {props.change >= 0 ?
              <Grid.Column textAlign='right' color='green' width={2}>
                <NavLink style={{color: 'white'}} to={link} onClick={() => props.search(props.symbol)}>
                  <p>{symbol}</p>
                  <p>{props.latestPrice}&nbsp;&nbsp;+{props.change}</p>
                  <p><Icon name='triangle up' />&nbsp;(+{(props.changePercent*100).toFixed(2)}%)</p>
                </NavLink>
              </Grid.Column>
            :
              <Grid.Column textAlign='right' color='red' width={2}>
                <NavLink style={{color: 'white'}} to={link} onClick={() => props.search(props.symbol)}>
                  <p>{symbol}</p>
                  <p>{props.latestPrice}&nbsp;&nbsp;{props.change}</p>
                  <p><Icon name='triangle down' />&nbsp;({(props.changePercent*100).toFixed(2)}%)</p>
                </NavLink>
              </Grid.Column>
          }
          </React.Fragment>

    const indexes = <React.Fragment>
            {props.change >= 0 ?
                <Grid.Column textAlign='right' color='green' width={2}>
                  <NavLink style={{color: 'white'}} to={link} onClick={() => props.search(props.symbol)}>
                    <p>{symbol}</p>
                    <p>{props.latestPrice}&nbsp;&nbsp;+{props.change}</p>
                    <p><Icon name='triangle up' />&nbsp;(+{(props.changePercent*100).toFixed(2)}%)</p>
                  </NavLink>
                </Grid.Column>
              :
                <Grid.Column textAlign='right' color='red' width={2}>
                  <NavLink style={{color: 'white'}} to={link} onClick={() => props.search(props.symbol)}>
                    <p>{symbol}</p>
                    <p>{props.latestPrice}&nbsp;&nbsp;{props.change}</p>
                    <p><Icon name='triangle down' />&nbsp;({(props.changePercent*100).toFixed(2)}%)</p>
                  </NavLink>
                </Grid.Column>
              }
                <Grid.Column width={1}>
                </Grid.Column>
            </React.Fragment>



  return (
    <React.Fragment>
      {symbol === 'VIX' ? vix : indexes}
    </React.Fragment>
  )
}

export default Index;
