import React from "react";
import Article from './Article';

class SearchResults extends React.Component {
  render() {
    return (
      <ul id="articles-container" className={this.props.isSearching ? 'loading' : ''}>
        {this.props.articles.map(article => 
          <Article 
            key={article['_id']}
            article={article}
          />
        )}
      </ul>
    );
  }
}

export default SearchResults;
