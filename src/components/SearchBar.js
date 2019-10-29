import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchStockDetail } from '../redux/actions';

const inputStyle = {
  width: '80%',
  padding: '5px 20px',
  borderRadius: '6px',
  marginTop: '14px',
};

class SearchBar extends React.Component {
  state ={
    value: '',
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const symbol = this.state.value.toUpperCase();
    this.props.history.push(`/detail?symbol=${symbol}`);
    this.props.dispatch(fetchStockDetail(symbol));
    this.setState({ value: '' });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input style={inputStyle} type="text" placeholder='Search for symbols' value={this.state.value} onChange={this.handleChange} />
          <Icon color='blue' size='large' name='search' circular onClick={this.handleSubmit}/>
        </form>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default withRouter(connect(
  null,
  mapDispatchToProps
)(SearchBar));
