import React from "react";

class SearchSort extends React.Component {
  handleSelectChange = e => {
    this.updateSortBy(e.target.value);
  }

  updateSortBy = value => {
    const searchState = {...this.props.search};
    searchState.sortBy = value;
    this.props.setSearch(searchState);
  }
  
  render() {
    return (
      <div id="sort-by-container">
        <label htmlFor="sort-by-select">Sort by:</label>
        <select 
          name="sortBy" 
          id="sort-by-select" 
          value={this.props.search.sortBy}
          onChange={this.handleSelectChange}
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
