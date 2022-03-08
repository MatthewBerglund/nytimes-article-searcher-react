import React from "react";

class SearchSort extends React.Component {
  render() {
    return (
      <div id="sort-by-container">
        <label htmlFor="sort-by-select">Sort by:</label>
        <select 
          name="sortBy" 
          id="sort-by-select" 
          value={this.props.search.sortBy}
          onChange={event => {this.props.setInputState(event)}}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="relevance">Relevance</option>
        </select>
      </div>
    );
  }
}

export default SearchSort;
