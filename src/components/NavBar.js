import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item as={NavLink} to='/'
            name='Market'
            active={activeItem === 'Market'}
          />
          <Menu.Item as={NavLink} to='/portfolio'
            name='Portfolio'
            active={activeItem === 'Portfolio'}
          />
          <Menu.Item as={NavLink} to='/watchlist'
            name='Watchlist'
            active={activeItem === 'Watchlist'}
          />
        </Menu>
      </Segment>
    )
  }
}

export default NavBar;
