import React from 'react';
import { Item } from 'semantic-ui-react';
//import { BrowserRouter, Route, Link } from 'react-router-dom'

const News = props => {
  //console.log(props);
  const heading = props.heading.replace(/amp;/g, ``).replace(/&apos;/g, `'`);
  //<Item.Image size='tiny' src={props.thumbnail} bordered/>
  return (
    <Item>
      <Item.Content>
        <Item.Header>
          {heading}
        </Item.Header>

        <Item.Meta>
          <span className='source'>Source: {props.source}</span>
          <span className='data'>Date: {props.date}</span>
        </Item.Meta>

        <Item.Description>
          <a href={props.url} target="_blank">
            {props.body}
          </a>
        </Item.Description>
      </Item.Content>
    </Item>
  )
}

export default News;

// <Link to={props.url} target="_blank"
//   onClick={(event) =>
//     {event.preventDefault(); window.open(this.makeHref(props.url));}}
//     >HEllo</Link>
