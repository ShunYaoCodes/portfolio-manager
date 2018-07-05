import React from 'react';
import News from './News'
import UUID from 'uuid';
import { Item } from 'semantic-ui-react';

const NewsList = props => {
  const newslist = props.news.map(news => <News key={UUID()} url={news.url} source={news.source} date={news.datetime} thumbnail={news.image} heading={news.headline} body={news.summary}/>)
  return (
    <Item.Group>
      {newslist}
    </Item.Group>
  )
}

export default NewsList;
