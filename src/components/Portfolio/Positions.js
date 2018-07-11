import React from 'react';
import { NavLink } from 'react-router-dom'
import { Table, Radio } from 'semantic-ui-react'

class Positions extends React.Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const link = `/quote?symbol=${this.props.symbol}`;
    const divDate = this.props.exDividendDate;

    return (
      <Table.Row>
        <Table.Cell>
          <Radio label='Long' value='Long' checked={this.state.value === 'Long'} onChange={this.handleChange}/>
          <Radio label='Short' value='Short' checked={this.state.value === 'Short'} onChange={this.handleChange}/>
        </Table.Cell>
        <Table.Cell><NavLink to={link} onClick={() => this.props.search(this.props.symbol)}>{this.props.symbol}</NavLink></Table.Cell>
        <Table.Cell>{this.props.beta}</Table.Cell>
        <Table.Cell>{this.props.shortInterest}</Table.Cell>
        <Table.Cell>{this.props.shortDate}</Table.Cell>
        <Table.Cell>{this.props.dividendRate}({this.props.dividendYield.toFixed(2)}%)</Table.Cell>
        <Table.Cell>{typeof(divDate) === 'string' ? divDate.split(' ')[0] : 'N/A'}</Table.Cell>
        <Table.Cell>{this.props.ttmEPS.toFixed(2)}</Table.Cell>
        <Table.Cell>{(this.props.day5ChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.day30ChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.month1ChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.month3ChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.month6ChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.ytdChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.year1ChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.year2ChangePercent*100).toFixed(2)}%</Table.Cell>
        <Table.Cell>{(this.props.year5ChangePercent*100).toFixed(2)}%</Table.Cell>
      </Table.Row>
    )
  }
}

export default Positions;
