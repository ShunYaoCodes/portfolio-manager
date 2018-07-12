import React from 'react';
import { Table } from 'semantic-ui-react'

const EachStats = props => {
  //console.log(props.shares);
  return (
    <Table.Row>
      <Table.Cell className='head'>{props.type}</Table.Cell>
      <Table.Cell>{props.symbol}</Table.Cell>
      <Table.Cell>{props.beta.toFixed(2)}</Table.Cell>
      <Table.Cell>{(props.weight*100).toFixed(2)}%</Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell>{(props.portionWeight*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.portion*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>{(props.position*100).toFixed(2)}%</Table.Cell>
      <Table.Cell>${props.amount.toFixed(2)}</Table.Cell>
      <Table.Cell>${props.price}</Table.Cell>
      <Table.Cell>{Math.ceil(props.shares)}</Table.Cell>
      <Table.Cell>{(props.percent*100).toFixed(2)}%</Table.Cell>
    </Table.Row>
  )
}

export default EachStats;
