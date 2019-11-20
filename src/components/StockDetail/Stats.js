import React from 'react';

import { Table } from 'semantic-ui-react'

const Stats = props => {
  //console.log('in stats', props);
  return (
    <div style={{overflow: 'auto'}}>
      <Table unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell className='head'>Last Price</Table.Cell>
            <Table.Cell>{props.latestPrice}</Table.Cell>
            <Table.Cell className='head'>Change</Table.Cell>
            <Table.Cell>{props.change.toFixed(2)}</Table.Cell>
            <Table.Cell className='head'>% Change</Table.Cell>
            <Table.Cell>{(props.changePercent*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>YTD Change</Table.Cell>
            <Table.Cell>{(props.ytdChange*100).toFixed(2)}%</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell className='head'>Daily High</Table.Cell>
            <Table.Cell>{props.high}</Table.Cell>
            <Table.Cell className='head'>Daily Low</Table.Cell>
            <Table.Cell>{props.low}</Table.Cell>
            <Table.Cell className='head'>Daily Volume</Table.Cell>
            <Table.Cell>{props.latestVolume}</Table.Cell>
            <Table.Cell className='head'>Average Volume</Table.Cell>
            <Table.Cell>{props.avgTotalVolume}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell className='head'>Sector</Table.Cell>
            <Table.Cell>{props.sector}</Table.Cell>
            <Table.Cell className='head'>Market Cap</Table.Cell>
            <Table.Cell>{props.marketCap}</Table.Cell>
            <Table.Cell className='head'>P/E Ratio</Table.Cell>
            <Table.Cell>{props.peRatio}</Table.Cell>
            <Table.Cell className='head'>52 Week High</Table.Cell>
            <Table.Cell>{props.week52High}</Table.Cell>
           </Table.Row>

           <Table.Row>
            <Table.Cell className='head'>52 Week Low</Table.Cell>
            <Table.Cell>{props.week52Low}</Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default Stats;
