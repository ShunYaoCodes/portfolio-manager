import React from 'react';
import MostActive from './MostActive';
import UUID from 'uuid';
import { Table } from 'semantic-ui-react';

const MostActiveList = props => {
  const list = props.mostActive.map(quote => <MostActive key={UUID()} {...quote} search={props.search}/>)

  return (
    <div>
      <h3>Most Active:</h3>
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

export default MostActiveList;
