import React from 'react';
import FilterFieldset from './FilterFieldset';

class SearchForm extends React.Component {
  state = {
    isMenuOpen: false,
  };

  filters = {
    newsDesks: [
      'Arts',
      'Business',
      'Culture',
      'Home & Garden',
      'Health & Fitness',
      'Fashion & Style',
      'Politics',
      'Science',
      'Sports',
      'Travel'
    ],
    materialTypes: [
      'News',
      'Interview',
      'Editorial',
      'Archives',
      'Op-ed'
    ]
  }

  renderFiltersContainer = () => {
    return (
      <div id="filters-container">
        <FilterFieldset
          fieldsetName="News desks"
          checkboxValues={this.filters.newsDesks}
          activeFilterValues={this.props.newsDesks}
          setFilter={this.props.setNewsDesks}
        />
        <FilterFieldset
          fieldsetName="Material types"
          checkboxValues={this.filters.materialTypes}
          activeFilterValues={this.props.materialTypes}
          setFilter={this.props.setMaterialTypes}
        />
        <div>
          <label htmlFor="location-search">Location:</label>
          <input 
            type="search" 
            id="location-search"
            name="glocation"
            value={this.props.glocation}
            onChange={e => this.props.setGlocation(e.target.value)}
          />
        </div>
      </div>
   );
  }

  renderLoadingMessage = () => {
    return (
      <div id="loading-msg">
        <p>Loading...</p>
      </div>
    );
  }
  
  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const filtersContainer = isMenuOpen ? this.renderFiltersContainer() : null;

    return (
      <form>
        <div id="search-controls-container">
          <div>
            <input
              type="search" 
              id="query-input"
              name="query" 
              placeholder="Enter a search term"
              value={this.props.searchQuery.query}
              onChange={e => {
                const searchQuery = {...this.props.searchQuery};
                searchQuery.query = e.target.value;
                this.props.setSearchQuery(searchQuery);
              }}
            />
          </div>
          <div>
            <label htmlFor="begin-date">Start:</label>
            <input 
              type="date" 
              id="begin-date" 
              name="begin" 
              value={this.props.searchQuery.beginDate} 
              onChange={e => {
                const searchQuery = {...this.props.searchQuery};
                searchQuery.beginDate = e.target.value;
                this.props.setSearchQuery(searchQuery);
              }}
            />
          </div>
          <div>
            <label htmlFor="end-date">End:</label>
            <input 
              type="date" 
              id="end-date" 
              name="end" 
              value={this.props.searchQuery.endDate}
              onChange={e => {
                const searchQuery = {...this.props.searchQuery};
                searchQuery.endDate = e.target.value;
                this.props.setSearchQuery(searchQuery);
              }} 
            />
          </div>
          <button type="button" id="submit" onClick={() => {
            this.props.setSortOrder('relevance');
            this.props.setPage(0);
            this.props.setIsSearching(true);
          }}>
            Search
          </button>
        </div>
        {filtersContainer}
        <button
          type="button"
          id="filters-button"  
          onClick={() => {
            const isMenuOpen = this.state.isMenuOpen;
            this.setState({
              isMenuOpen: !isMenuOpen
            });
          }
        }>
          {this.state.isMenuOpen ? 'Hide filters': 'Show filters'}
        </button>
      </form>
    );
  }
}

export default SearchForm;
