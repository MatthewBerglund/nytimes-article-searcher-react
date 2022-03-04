import React from "react";
import Article from './Article';

class SearchResults extends React.Component {
  render() {
    return (
      <ul id="articles-container">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </ul>
    );
  }
}

export default SearchResults;
