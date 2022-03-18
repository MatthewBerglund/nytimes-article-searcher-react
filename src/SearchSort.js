import React from "react";

class SearchSort extends React.Component {
  render() {
    const {urlSearchParams, setUrlSearchParams} = this.props;
    const searchParams = Object.fromEntries([...urlSearchParams]);

    return (
      <div id="sort-order-container">
        <label htmlFor="sort-order-select">Sort by:</label>
        <select 
          name="sortOrder" 
          id="sort-order-select" 
          value={searchParams.sort || 'relevance'}
          onChange={e => {
            searchParams.sort = e.target.value;
            setUrlSearchParams(searchParams);
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
