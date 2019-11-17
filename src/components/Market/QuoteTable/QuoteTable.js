import React from 'react';
import QuoteTableRow from './QuoteTableRow';
import UUID from 'uuid';
import { Table } from 'semantic-ui-react';

const QuoteTable = props => {
  const tableRows = props.tableRows.map(quote => <QuoteTableRow key={UUID()} {...quote} />)

  return (
    <div>
      <h3>{props.tableName}:</h3>
      <Table color='blue' unstackable columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Symbol</Table.HeaderCell>
            <Table.HeaderCell>Last Price</Table.HeaderCell>
            <Table.HeaderCell>Change</Table.HeaderCell>
            <Table.HeaderCell>% Change</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableRows}
        </Table.Body>
      </Table>
    </div>
  )
}

export default QuoteTable;
