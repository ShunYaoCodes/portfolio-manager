import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import QuoteTable from './QuoteTable/QuoteTable';

const SearchHistory = ({searchHistoryQuotes}) => {
  let stocks = [];

  if (searchHistoryQuotes && Object.keys(searchHistoryQuotes).length) {
    let count = 0;
    
    for(const stock in searchHistoryQuotes) {
      if (count > 9) break; // only display the latest 10 stocks
      stocks.push(searchHistoryQuotes[stock].quote);
      count++;
    }

    return <QuoteTable tableName='Recently Viewed' tableRows={stocks} />;
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

const mapStateToProps = state => {
  const { searchHistoryQuotes } = state;
  return searchHistoryQuotes;
};

export default connect(mapStateToProps)(SearchHistory);