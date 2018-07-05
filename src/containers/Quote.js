import React from 'react';
//import IndexList from '../components/IndexList';
import NewsList from '../components/NewsList';
import Asset from '../components/Quote/Asset';
import { Grid } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'

class Quote extends React.Component {
  handleClick = (event, data) => {
    this.props.click(data.checked, this.props.quote.symbol)
  }

  render() {
    //console.log(this.props.news);
    //console.log(this.props.quote.symbol);
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={6}>
            <Checkbox toggle onClick={this.handleClick}/> Add to your watchlist
          </Grid.Column>

          <Grid.Column width={6}>
            <Checkbox toggle /> Add to your portfolio
          </Grid.Column>
        </Grid.Row>

        <Asset />

        <Grid.Row>
          <Grid.Column width={12}>
            <NewsList news={this.props.news}/>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

export default Quote;
