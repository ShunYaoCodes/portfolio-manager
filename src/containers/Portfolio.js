import React from 'react';
import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Positions from '../components/Portfolio/Positions';
import Stats from '../components/Portfolio/Stats';
import { Grid, Table } from 'semantic-ui-react'

class Portfolio extends React.Component {
  render() {
    //console.log(this.props.portfolio);

    let list = [];

    if (Object.keys(this.props.portfolio) !== []) {
      for(const quote in this.props.portfolio) {
        list.push(<Positions quote={this.props.portfolio[quote].quote} />)
      }
    }

    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={12}>
            <h3>Your Portfolio:</h3>
            <Table>
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
          <Grid.Column width={12}>
            <Stats />
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Portfolio;
