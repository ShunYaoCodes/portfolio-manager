import React from 'react';

import { Table } from 'semantic-ui-react'

const Stats = props => {
  //console.log(props);
  return (
    <React.Fragment>
      {Object.keys(props).length > 0 ?
        <Table>
          <Table.Row>
            <Table.Header>
              <Table.HeaderCell>Last Price</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{props.latestPrice}</Table.Cell>
            <Table.Header>
              <Table.HeaderCell>Change</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{props.change.toFixed(2)}</Table.Cell>
            <Table.Header>
              <Table.HeaderCell>% Change</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{(props.changePercent*100).toFixed(2)}%</Table.Cell>
            <Table.Header>
              <Table.HeaderCell>YTD Change</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{(props.ytdChange*100).toFixed(2)}%</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Header>
              <Table.HeaderCell>Daily High</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{props.high}</Table.Cell>
            <Table.Header>
              <Table.HeaderCell>Daily Low</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{props.low}</Table.Cell>
            <Table.Header>
              <Table.HeaderCell>Daily Volume</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{props.latestVolume}</Table.Cell>
            <Table.Header>
              <Table.HeaderCell>Average Volume</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{props.avgTotalVolume}</Table.Cell>
          </Table.Row>

          <Table.Row>
             <Table.Header>
               <Table.HeaderCell>Sector</Table.HeaderCell>
             </Table.Header>
             <Table.Cell>{props.sector}</Table.Cell>
             <Table.Header>
               <Table.HeaderCell>Market Cap</Table.HeaderCell>
             </Table.Header>
             <Table.Cell>{props.marketCap}</Table.Cell>
             <Table.Header>
               <Table.HeaderCell>P/E Ratio</Table.HeaderCell>
             </Table.Header>
             <Table.Cell>{props.peRatio}</Table.Cell>
             <Table.Header>
               <Table.HeaderCell>52 Week High</Table.HeaderCell>
             </Table.Header>
             <Table.Cell>{props.week52High}</Table.Cell>
           </Table.Row>

           <Table.Row>
            <Table.Header>
              <Table.HeaderCell>52 Week Low</Table.HeaderCell>
            </Table.Header>
            <Table.Cell>{props.week52Low}</Table.Cell>
            <Table.Header>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Header>
            <Table.Cell></Table.Cell>
            <Table.Header>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Header>
            <Table.Cell></Table.Cell>
            <Table.Header>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Header>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table>
      : null}
    </React.Fragment>
  )
}

export default Stats;
