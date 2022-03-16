import React from "react";

class SearchSort extends React.Component {
  render() {
    return (
      <div id="sort-order-container">
        <label htmlFor="sort-order-select">Sort by:</label>
        <select 
          name="sortOrder" 
          id="sort-order-select" 
          value={this.props.sortOrder}
          onChange={e => this.props.setSortOrder(e.target.value)}
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
