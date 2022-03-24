import React from "react";
import Article from './Article';

class SearchResults extends React.Component {
  render() {
    const { articles, isFetching } = this.props;

    return (
      <ul id="articles-container" className={isFetching ? 'loading' : ''}>
        {articles.map(article => 
          <Article 
            key={article._id}
            article={article}
          />
        )}
      </ul>
    );
  }
}

export default SearchResults;
