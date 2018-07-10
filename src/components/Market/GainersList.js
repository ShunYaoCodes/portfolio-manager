import React from 'react';
import Gainer from './Gainer';
import UUID from 'uuid';
import { Table } from 'semantic-ui-react';

const GainersList = props => {
  const list = props.gainers.map(quote => <Gainer key={UUID()} {...quote} search={props.search}/>)

  return (
    <div>
      <h3>Gainers:</h3>
      <Table color='blue' columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>Last Price</Table.HeaderCell>
            <Table.HeaderCell>Change</Table.HeaderCell>
            <Table.HeaderCell>% Change</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list}
        </Table.Body>
      </Table>
    </div>
  )
}

export default GainersList;
