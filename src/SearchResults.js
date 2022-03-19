import React from "react";
import Article from './Article';

class SearchResults extends React.Component {
  render() {
    const {articles, isFetching} = this.props;

    return (
      <ul id="articles-container" className={isFetching ? 'loading' : ''}>
        {articles.map(article => 
          <Article 
            key={article._id}
            article={article}
            urlSearchParams={this.props.urlSearchParams}
            setUrlSearchParams={this.props.setUrlSearchParams}
            setCurrentPage={this.props.setCurrentPage}
          />
        )}
      </ul>
    );
  }
}

export default SearchResults;
