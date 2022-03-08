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
    return (
      <div id="filters-container">
        <FilterFieldset
          details={this.newsDesks} 
          state={this.props.search.newsDesks}
          setInputState={this.props.setInputState}
        />
        <FilterFieldset 
          details={this.materialTypes}
          state={this.props.search.materialTypes}
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

    return (
      <form onSubmit={this.handleSearchSubmit}>
        <div id="search-controls-container">
          <div>
            <input
              type="search" 
              id="query-input"
              name="query" 
              placeholder="Enter a search term"
              value={this.props.search.query}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="begin-date">Start:</label>
            <input id="begin-date" type="date" />
          </div>
          <div>
            <label htmlFor="end-date">End:</label>
            <input id="end-date" type="date" />
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
