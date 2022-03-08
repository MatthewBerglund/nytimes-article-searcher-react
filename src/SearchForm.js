import React from 'react';
import FilterFieldset from './FilterFieldset';

class SearchForm extends React.Component {
  state = {
    isMenuOpen: false
  };

  componentDidMount() {
    this.props.addFiltersToState([this.newsDesks, this.materialTypes]);
  }

  newsDesks = {
    filterType: 'News desks',
    labels: [
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
    ]
  }

  materialTypes = {
    filterType: 'Material types',
    labels: [
      'News', 
      'Interview', 
      'Editorial', 
      'Archives', 
      'Op-ed'
    ]
  }

  handleChange = event => {
    this.props.setInputState(event);
  }

  renderFiltersContainer = () => {
    const {newsDesks, materialTypes} = this.props.search;
    
    return (
      <div id="filters-container">
        <FilterFieldset
          details={this.newsDesks} 
          state={newsDesks}
          setInputState={this.props.setInputState}
        />
        <FilterFieldset 
          details={this.materialTypes}
          state={materialTypes}
          setInputState={this.props.setInputState}
        />
        <div>
          <label htmlFor="location-search">Location:</label>
          <input type="search" id="location-search" />
        </div>
      </div>
   );
  }
  
  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const filtersContainer = isMenuOpen ? this.renderFiltersContainer() : null;
    const {query, begin, end, glocation} = this.props.search;

    return (
      <form onSubmit={this.handleSearchSubmit}>
        <div id="search-controls-container">
          <div>
            <input
              type="search" 
              id="query-input"
              name="query" 
              placeholder="Enter a search term"
              value={query}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="begin-date">Start:</label>
            <input 
              type="date" 
              id="begin-date" 
              name="begin" 
              value={begin} 
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <label htmlFor="end-date">End:</label>
            <input 
              type="date" 
              id="end-date" 
              name="end" 
              value={end} 
              onChange={this.handleChange} 
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
