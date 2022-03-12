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
          activeFilterValues={this.props.newsDeskFilter}
          setFilter={this.props.setNewsDeskFilter}
        />
        <FilterFieldset
          fieldsetName="Material types"
          checkboxValues={this.filters.materialTypes}
          activeFilterValues={this.props.materialTypeFilter}
          setFilter={this.props.setMaterialTypeFilter}
        />
        <div>
          <label htmlFor="location-search">Location:</label>
          <input 
            type="search" 
            id="location-search"
            name="glocation"
            value={this.props.glocationFilter}
            onChange={e => this.props.setGlocationFilter(e.target.value)}
          />
        </div>
      </div>
   );
  }
  
  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const filtersContainer = isMenuOpen ? this.renderFiltersContainer() : null;

    return (
      <form onSubmit={e => {
        e.preventDefault();
        this.props.setSortOrder('relevance');
        this.props.setPage(0);
        this.props.fetchArticles();
      }}>
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
          <button id="submit">Search</button>
        </div>
        {filtersContainer}
        <button 
          id="filters-button"  
          onClick={event => {
            event.preventDefault();
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
