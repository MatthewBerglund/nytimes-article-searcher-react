import React from "react";

class SearchSort extends React.Component {
  render() {
    const {sortOrder, setSortOrder} = this.props;

    return (
      <div id="sort-order-container">
        <label htmlFor="sort-order-select">Sort by:</label>
        <select 
          name="sortOrder" 
          id="sort-order-select" 
          value={sortOrder}
          onChange={e => {
            setSortOrder(e.target.value);
            this.props.fetchArticles();
          }}
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
