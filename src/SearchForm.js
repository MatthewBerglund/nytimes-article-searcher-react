import React, { createRef } from 'react';
import { getValuesFromFieldset } from './helpers';
import FilterFieldset from './FilterFieldset';

class SearchForm extends React.Component {
  state = {
    isMenuOpen: false,
  };

  query = createRef();
  beginDate = createRef();
  endDate = createRef();
  glocation = createRef();
  newsDesks = createRef();
  materialTypes = createRef();

  componentDidUpdate() {
    let query = this.props.urlSearchParams.get('query');
    this.query.current.value = query ? query : '';
  }

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
  };

  submitNewSearch = () => {
    const searchParams = {}
    searchParams.sort = 'relevance';

    if (this.query.current.value) {
      searchParams.query = this.query.current.value;
    }

    if (this.beginDate.current.value) {
      searchParams.begin_date = this.beginDate.current.value;
    }

    if (this.endDate.current.value) {
      searchParams.end_date = this.endDate.current.value;
    }

    if (this.glocation.current.value) {
      searchParams.glocation = this.glocation.current.value;
    }

    const newsDeskValues = getValuesFromFieldset(this.newsDesks.current);
    if (newsDeskValues.length > 0) {
      searchParams.newsDesks = newsDeskValues.join(',');
    }

    const materialTypeValues = getValuesFromFieldset(this.materialTypes.current);
    if (materialTypeValues.length > 0) {
      searchParams.materialTypes = materialTypeValues.join(',');
    }

    this.props.setCurrentPage(0);
    this.props.setUrlSearchParams(searchParams);
  }
  
  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const urlSearchParams = this.props.urlSearchParams;
    const searchParams = Object.fromEntries([...urlSearchParams]);
    
    return (
      <form>
        <div id="search-controls-container">
          <div>
            <input
              type="search" 
              id="query-input"
              ref={this.query}
              placeholder="Enter a search term"
              defaultValue={searchParams.query || ''}
            />
          </div>
          <div>
            <label htmlFor="begin-date">Start:</label>
            <input 
              type="date" 
              id="begin-date"
              ref={this.beginDate}
              defaultValue={searchParams.begin_date || ''}
            />
          </div>
          <div>
            <label htmlFor="end-date">End:</label>
            <input 
              type="date" 
              id="end-date"
              ref={this.endDate} 
              defaultValue={searchParams.end_date || ''}
            />
          </div>
          <button 
            type="button" 
            id="submit" 
            onClick={this.submitNewSearch}
          >
            Search
          </button>
        </div>
        <div id="filters-container" className={isMenuOpen ? 'open' : ''}>
          <FilterFieldset
            fieldsetName="News desks"
            filter="newsDesks"
            checkboxValues={this.filters.newsDesks}
            reference={this.newsDesks}
          />
          <FilterFieldset
            fieldsetName="Material types"
            filter="materialTypes"
            checkboxValues={this.filters.materialTypes}
            reference={this.materialTypes}
          />
          <div>
            <label htmlFor="location-search">Location:</label>
            <input
              type="search"
              id="location-search"
              ref={this.glocation}
              defaultValue={searchParams.glocation || ''}
            />
          </div>
        </div>
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
