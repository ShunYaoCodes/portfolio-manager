import React from 'react';
import Loser from './Loser';
import UUID from 'uuid';
import { Table } from 'semantic-ui-react';

const LosersList = props => {
  const list = props.losers.map(quote => <Loser key={UUID()} {...quote} />)

  return (
    <div>
      <h3>Losers:</h3>
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

export default LosersList;
