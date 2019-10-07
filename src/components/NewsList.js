import React from 'react';
import News from './News'
import UUID from 'uuid';
import { Item } from 'semantic-ui-react';

const NewsList = props => {
  const {news} = props;
  const newslist = [];
  
  for (let symbol in news) {
    const all_symbol_news = news[symbol].news;
    all_symbol_news.forEach(symbol_news => {
      newslist.push(
        <News 
          key={UUID()} 
          url={symbol_news.url} 
          source={symbol_news.source} 
          date={symbol_news.datetime} 
          thumbnail={symbol_news.image} 
          heading={symbol_news.headline} 
          body={symbol_news.summary} 
        />
      );
    })
  }
  
  return (
    <Item.Group>
      {newslist}
    </Item.Group>
  )
}

export default NewsList;