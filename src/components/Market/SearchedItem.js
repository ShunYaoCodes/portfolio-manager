import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Grid, Image, Divider } from 'semantic-ui-react'

const SearchedItem = props => {
  return (
    <div>
      <li>{props.asset}</li>
    </div>
  )
}

export default SearchedItem;
