import React from 'react';
import { Table } from 'semantic-ui-react'

const EachStats = props => {
  //console.log(props.shares);
  return (
    <Table.Row>
      <Table.Cell className='head'>{props.type}</Table.Cell>
      <Table.Cell>{props.symbol}</Table.Cell>
      <Table.Cell>{props.beta ? props.beta.toFixed(2) : 'N/A'}</Table.Cell>
      <Table.Cell>{props.weight ? (props.weight*100).toFixed(2) : 'N/A'}%</Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell>{props.portionWeight ? (props.portionWeight*100).toFixed(2) : 'N/A'}%</Table.Cell>
      <Table.Cell>{props.portion ? (props.portion*100).toFixed(2) : 'N/A'}%</Table.Cell>
      <Table.Cell>{props.position ? (props.position*100).toFixed(2) : 'N/A'}%</Table.Cell>
      <Table.Cell>${props.amount ? props.amount.toFixed(2) : 'N/A'}</Table.Cell>
      <Table.Cell>${props.price}</Table.Cell>
      <Table.Cell active>{props.shares ? Math.ceil(props.shares) : 'N/A'}</Table.Cell>
      <Table.Cell>{props.percent ? (props.percent*100).toFixed(2) : 'N/A'}%</Table.Cell>
    </Table.Row>
  )
}

export default EachStats;
