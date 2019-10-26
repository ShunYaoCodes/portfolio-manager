import React from 'react';
import Positions from '../components/Portfolio/Positions';
import Stats from '../components/Portfolio/Stats';
import UUID from 'uuid';
import { Grid, Table, Form, Input, Button, Message } from 'semantic-ui-react';
import AuthAdapter from '../adapters/AuthAdapter';
import ApiAdapter from '../adapters/ApiAdapter';
import { connect } from 'react-redux';
import { fetchPortfolio } from "../redux/actions";

class Portfolio extends React.Component {
  state = {
    value: null,
    amount: 25000,
    portfolioQuotes: [],
  }

  componentDidMount() {
    if (AuthAdapter.loggedIn()) this.props.dispatch(fetchPortfolio());
    if (this.props.portfolio.length) this.fetchPortfolioQuotes();

    this.intervalID = setInterval(() => {
      if (this.props.portfolio.length) this.fetchPortfolioQuotes();
    },3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  fetchPortfolioQuotes = () => {
    fetch(ApiAdapter.getBatchStatsPrice(this.portfolioSymbols)).then(r => r.json()).then(quotes => {
      for(const symbol in quotes) {
        const quote = this.props.portfolio.find(each => each.symbol === symbol);
        quotes[symbol].position_type = quote.position_type;
        quotes[symbol].id = quote.id; // add corresponding stock's backend id
      }

      this.setState({ 
        portfolioQuotes: quotes 
      })
    })
  }

  get portfolioSymbols() {
    return this.props.portfolio.map(stock => stock.symbol);
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
    if (AuthAdapter.loggedIn()) {
      let list = [];
      let betaList = [];

      //if (Object.keys(this.state.portfolioQuotes) !== []) {
        for(const quote in this.state.portfolioQuotes) {
          list.push(<Positions key={UUID()} {...this.state.portfolioQuotes[quote]} symbol={quote} search={this.props.search} />)
        }
      //}

      for(const quote in this.state.portfolioQuotes) {
        betaList.push({symbol: quote, price: this.state.portfolioQuotes[quote].price, beta: this.state.portfolioQuotes[quote].stats.beta, position_type: this.state.portfolioQuotes[quote].position_type})
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
    } else {
      return <p>Please sign in to see your portfolio</p>
    }
  }
}

const mapStateToProps = state => {
  return { portfolio: state.portfolio };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
