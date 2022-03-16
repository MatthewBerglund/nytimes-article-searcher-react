import React from 'react';
import Keyword from './Keyword';

class Article extends React.Component {
  render() {
    return (
      <li>
        <article>
          <a href={this.props.article['web_url']} target="_blank" className="headline-link">
            <h2>{this.props.article.headline.main}</h2>
          </a>
          <p className="article-abstract">{this.props.article['pub_date']}</p>
          <img className="article-img" />
          <ul className="keywords"></ul>
        </article>
      </li>
    );
  }
}

export default Article;
