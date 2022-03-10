import React from 'react';
import FilterFieldset from './FilterFieldset';

class SearchForm extends React.Component {
  state = {
    isMenuOpen: false,
  };

  filters = {
    newsDesk: [
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
    typeOfMaterial: [
      'News',
      'Interview',
      'Editorial',
      'Archives',
      'Op-ed'
    ]
  }

  handleFormElementChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.updateSearch(name, value);
  }

  updateSearch = (name, value) => {
    const searchState = {...this.props.search};
    searchState[name] = value;
    this.props.setSearch(searchState);
  }

  renderFiltersContainer = () => {
    return (
      <div id="filters-container">
        <FilterFieldset
          filterField="News desk"
          filterValues={this.filters.newsDesk}
          search={this.props.search}
          setSearch={this.props.setSearch}
        />
        <FilterFieldset
          filterField="Type of material"
          filterValues={this.filters.typeOfMaterial}
          search={this.props.search}
          setSearch={this.props.setSearch}
        />
        <div>
          <label htmlFor="location-search">Location:</label>
          <input 
            type="search" 
            id="location-search"
            name="glocation"
            value={this.props.search.glocation}
            onChange={this.handleFormElementChange}
          />
        </div>
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
              value={this.props.search.query}
              onChange={this.handleFormElementChange}
            />
          </div>
          <div>
            <label htmlFor="begin-date">Start:</label>
            <input 
              type="date" 
              id="begin-date" 
              name="begin" 
              value={this.props.search.begin} 
              onChange={this.handleFormElementChange}
            />
          </div>
          <div>
            <label htmlFor="end-date">End:</label>
            <input 
              type="date" 
              id="end-date" 
              name="end" 
              value={this.props.search.end}
              onChange={this.handleFormElementChange} 
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
