import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  state = { 
    activePathName: window.location.pathname
  }

  handleItemClick = (e, { to }) => this.setState({ activePathName: to })

  render() {
    const { activePathName } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item as={Link} to='/'
            name='Market'
            active={activePathName === '/'}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={Link} to='/portfolio'
            name='Portfolio'
            active={activePathName === '/portfolio'}
            onClick={this.handleItemClick}
          />
          <Menu.Item as={Link} to='/watchlist'
            name='Watchlist'
            active={activePathName === '/watchlist'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

export default NavBar;
