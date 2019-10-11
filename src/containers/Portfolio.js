import React from 'react';
import Positions from '../components/Portfolio/Positions';
import Stats from '../components/Portfolio/Stats';
import UUID from 'uuid';
import { Grid, Table, Form, Input, Button, Message } from 'semantic-ui-react'

class Portfolio extends React.Component {
  state = {
    value: null,
    amount: 25000,
  }

  handleChange = (e, { value }) => {
    this.setState({ value })
  }

  handleSubmit = (e, { error }) => {
    if (!error) {
      this.setState({ amount: this.state.value })
    }
  }

  render() {
    //console.log(this.props.portfolio);

    let list = [];
    let betaList = [];

    //if (Object.keys(this.props.portfolio) !== []) {
      for(const quote in this.props.portfolio) {
        list.push(<Positions key={UUID()} {...this.props.portfolio[quote]} symbol={quote} search={this.props.search} type={this.props.type}/>)
      }
    //}

    for(const quote in this.props.portfolio) {
      betaList.push({symbol: quote, price: this.props.portfolio[quote].price, beta: this.props.portfolio[quote].stats.beta, position_type: this.props.portfolio[quote].position_type})
    }

    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={14}>
            <h3>Adjust Your Long / Short Positions:</h3>
            <Table color='blue'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Long or Short?</Table.HeaderCell>
                  <Table.HeaderCell>Symbol</Table.HeaderCell>
                  <Table.HeaderCell>Beta</Table.HeaderCell>
                  <Table.HeaderCell>Short Interest</Table.HeaderCell>
                  <Table.HeaderCell>Short Date</Table.HeaderCell>
                  <Table.HeaderCell>Forward Dividend & Yield</Table.HeaderCell>
                  <Table.HeaderCell>Ex-Dividend Date</Table.HeaderCell>
                  <Table.HeaderCell>EPS (TTM)</Table.HeaderCell>
                  <Table.HeaderCell>5 Day % Change</Table.HeaderCell>
                  <Table.HeaderCell>30 Day % Change</Table.HeaderCell>
                  <Table.HeaderCell>3 Month % Change</Table.HeaderCell>
                  <Table.HeaderCell>6 Month % Change</Table.HeaderCell>
                  <Table.HeaderCell>1 Year % Change</Table.HeaderCell>
                  <Table.HeaderCell>2 Year % Change</Table.HeaderCell>
                  <Table.HeaderCell>5 Year % Change</Table.HeaderCell>
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
            <h3>Your Beta Hedge Recommendation:</h3>
            <Form onSubmit={this.handleSubmit} error={!(Number(this.state.value, 10) >= 0)}>
              <Input placeholder='Enter your amount' onChange={this.handleChange}/>
              <Button disabled={!(Number(this.state.value, 10) >= 0)}>Submit</Button>
              <Message error content='Please enter only a positive number'/>
            </Form>
            <h5 className='inline'>Total Amount Invested: ${this.state.amount}</h5> (Default: $25000)
            <Stats betas={betaList} amount={this.state.amount}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Portfolio;
