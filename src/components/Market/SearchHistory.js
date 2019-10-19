import React from 'react';
import { Table } from 'semantic-ui-react';
import QuoteTable from './QuoteTable/QuoteTable';

const SearchHistory = props => {
  let stocks = [];

  if (Object.keys(props.searchHistory).length) {
    let count = 0;
    
    for(const stock in props.searchHistory) {
      if (count > 9) break; // only display the latest 10 stocks
      stocks.push(props.searchHistory[stock].quote);
      count++;
    }

    return <QuoteTable tableName='Recently Viewed' tableRows={stocks} search={props.search}/>;
  } else {
    return (
      <div>
        <h3>Your Recently Viewed:</h3>
        <Table color='blue' columns={4}>
          <Table.Header>
            <h4>Your list is empty</h4>
          </Table.Header>
        </Table>
      </div>
    )
  }
}

export default SearchHistory;