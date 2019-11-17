import React from 'react';
import { Item } from 'semantic-ui-react';

const News = props => {
  const heading = props.heading.replace(/amp;/g, ``).replace(/&apos;/g, `'`).replace(/&#xAE;/g,`®`).replace(/&quot;/g, `'`).replace(/&#xF6;/g, 'ö').replace(/&#xE4;/g, 'ä');
  //<Item.Image size='tiny' src={props.thumbnail} bordered/>
  return (
    <Item style={itemStyle}>
      <Item.Content>
        <Item.Header>
          {heading}
        </Item.Header>

        <Item.Meta>
          <span className='source'>Source: {props.source}</span>
          <span className='data'>Date: {props.date}</span>
        </Item.Meta>

        <Item.Description className='mobile-hide'>
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            {props.body}
          </a>
        </Item.Description>
      </Item.Content>
    </Item>
  )
}

const itemStyle = {
  padding: `10px 10px`,
  border: `1px dotted #ccc`,
  borderRadius: `4px`
}

export default News;

// <Link to={props.url} target="_blank"
//   onClick={(event) =>
//     {event.preventDefault(); window.open(this.makeHref(props.url));}}
//     >HEllo</Link>
