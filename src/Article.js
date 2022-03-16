import React from 'react';
import Keyword from './Keyword';
import ArticleAbstract from './ArticleAbstract';
import ArticleThumbnail from './ArticleThumbnail';
import KeywordList from './KeywordList';

class Article extends React.Component {
  render() {
    const article = this.props.article;

    return (
      <li>
        <article>
          <a href={article.web_url} target="_blank" className="headline-link">
            <h2>{article.headline.main}</h2>
          </a>
          <ArticleAbstract abstract={article.abstract} />
          <ArticleThumbnail thumbnail={article.multimedia.find(image => image.subtype === 'blog225')} />
          <KeywordList keywords={article.keywords} />
          {/* <ul className="keywords"></ul> */}
        </article>
      </li>
    );
  }
}

export default Article;
