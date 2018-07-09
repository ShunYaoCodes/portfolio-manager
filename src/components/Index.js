import React from 'react';

import { Grid, Icon, Divider } from 'semantic-ui-react'

const Index = props => {
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
  }
  
  return (
    <React.Fragment>
      {props.change >= 0 ?
          <Grid.Column textAlign='right' color='green' width={1}>
            <p>{symbol}</p>
            <p>{props.latestPrice}&nbsp;&nbsp;+{props.change}</p>
            <p><Icon name='triangle up' />&nbsp;(+{(props.changePercent*100).toFixed(2)}%)</p>
          </Grid.Column>
        :
          <Grid.Column textAlign='right' color='red' width={1}>
            <p>{symbol}</p>
            <p>{props.latestPrice}&nbsp;&nbsp;{props.change}</p>
            <p><Icon name='triangle down' />&nbsp;({(props.changePercent*100).toFixed(2)}%)</p>
          </Grid.Column>
      }
      <Grid.Column width={1}>
      </Grid.Column>
    </React.Fragment>
  )
}

export default Index;
