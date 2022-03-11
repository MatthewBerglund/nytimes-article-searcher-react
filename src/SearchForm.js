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

  renderFiltersContainer = () => {
    return (
      <div id="filters-container">
        <FilterFieldset
          fieldsetName="News desks"
          checkboxValues={this.filters.newsDesk}
          activeFilterValues={this.props.newsDeskFilter}
          setFilter={this.props.setNewsDeskFilter}
        />
        <FilterFieldset
          fieldsetName="Material types"
          checkboxValues={this.filters.typeOfMaterial}
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
      <form>
        <div id="search-controls-container">
          <div>
            <input
              type="search" 
              id="query-input"
              name="query" 
              placeholder="Enter a search term"
              value={this.props.query}
              onChange={e => this.props.setQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="begin-date">Start:</label>
            <input 
              type="date" 
              id="begin-date" 
              name="begin" 
              value={this.props.beginDate} 
              onChange={e => this.props.setBeginDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="end-date">End:</label>
            <input 
              type="date" 
              id="end-date" 
              name="end" 
              value={this.props.endDate}
              onChange={e => this.props.setEndDate(e.target.value)} 
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
