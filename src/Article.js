import React from 'react';
import Keyword from './Keyword';

class Article extends React.Component {
  render() {
    return (
      <li>
        <article>
          <a target="blank" className="headline-link">
            <h2>This is a very very serious issue</h2>
          </a>
          <p className="article-abstract">Several sources have said that the issue is actually even more very very serious than originally thought.</p>
          <img className="article-img" />
          <ul className="keywords">
            <Keyword />
            <Keyword />
            <Keyword />
          </ul>
        </article>
      </li>
    );
  }
}

export default Article;
