import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Watchlists from '../components/Watchlist/Watchlists';
import UUID from 'uuid';
import { Grid, Table } from 'semantic-ui-react'

class Watchlist extends React.Component {
  render() {
    //console.log(this.props.watchlist);
    const list = this.props.watchlist.map(each => <Watchlists key={UUID()} {...each} search={this.props.search}/>)

    return (
      <React.Fragment>
        <Grid.Row>
          <IndexList indexes={this.props.indexes} search={this.props.search}/>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={14}>
            <h3>Your Watchlist:</h3>
            <Table color='blue'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Symbol</Table.HeaderCell>
                  <Table.HeaderCell>Last Price</Table.HeaderCell>
                  <Table.HeaderCell>Change</Table.HeaderCell>
                  <Table.HeaderCell>% Change</Table.HeaderCell>
                  <Table.HeaderCell>Daily High</Table.HeaderCell>
                  <Table.HeaderCell>Daily Low</Table.HeaderCell>
                  <Table.HeaderCell>Daily Volume</Table.HeaderCell>
                  <Table.HeaderCell>Average Volume</Table.HeaderCell>
                  <Table.HeaderCell>Sector</Table.HeaderCell>
                  <Table.HeaderCell>Market Cap</Table.HeaderCell>
                  <Table.HeaderCell>P/E Ratio</Table.HeaderCell>
                  <Table.HeaderCell>52 Week High</Table.HeaderCell>
                  <Table.HeaderCell>52 Week Low</Table.HeaderCell>
                  <Table.HeaderCell>YTD Change</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {list}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={14}>
            <h3>Your Watchlist News:</h3>
            <NewsList news={this.props.news}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Watchlist;
