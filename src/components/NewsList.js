import React from 'react';
import News from './News'
import UUID from 'uuid';
import { Item } from 'semantic-ui-react';

class NewsList extends React.Component {
  get type() {
    return this.props.type;
  }

  get news() {
    return this.props.news;
  }

  handle_data = () => {
    switch(this.type) {
      case 'market':
        for (let symbol in this.news) {
          const all_symbol_news = this.news[symbol].news;
          this.handle_news(all_symbol_news);
        }
        break;
      case 'quote':
      case 'watchlist':
      default:
          this.handle_news(this.news);
    }
  }

  handle_news = (news) => {
    news.forEach(symbol_news => {
      this.newslist.push(
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

  render() {
    this.newslist = [];
    this.handle_data();

    return (
      <Item.Group>
        {this.newslist}
      </Item.Group>
    )
  }
}

export default NewsList;