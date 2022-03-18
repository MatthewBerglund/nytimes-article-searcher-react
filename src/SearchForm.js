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
  };

  renderFiltersContainer = () => {
    const {urlSearchParams, setUrlSearchParams} = this.props;
    const searchParams = Object.fromEntries([...urlSearchParams]);

    return (
      <div id="filters-container">
        <FilterFieldset
          fieldsetName="News desks"
          filter="newsDesks"
          checkboxValues={this.filters.newsDesks}
          urlSearchParams={urlSearchParams}
          setUrlSearchParams={setUrlSearchParams}
        />
        <FilterFieldset
          fieldsetName="Material types"
          filter="materialTypes"
          checkboxValues={this.filters.materialTypes}
          urlSearchParams={urlSearchParams}
          setUrlSearchParams={setUrlSearchParams}
        />
        <div>
          <label htmlFor="location-search">Location:</label>
          <input 
            type="search" 
            id="location-search"
            name="glocation"
            value={searchParams.glocation || ''}
            onChange={e => {
              const glocation = e.target.value;
              if (glocation) {
                searchParams.glocation = glocation;
              } else {
                delete searchParams.glocation;
              }
              setUrlSearchParams(searchParams);
            }}
          />
        </div>
      </div>
   );
  }
  
  render() {
    const isMenuOpen = this.state.isMenuOpen;
    const filtersContainer = isMenuOpen ? this.renderFiltersContainer() : null;
    const {urlSearchParams, setUrlSearchParams} = this.props;
    const searchParams = Object.fromEntries([...urlSearchParams]);
    
    return (
      <form>
        <div id="search-controls-container">
          <div>
            <input
              type="search" 
              id="query-input" 
              placeholder="Enter a search term"
              value={searchParams.query || ''}
              onChange={e => {
                const query = e.target.value;
                if (query) {
                  searchParams.query = query;
                } else {
                  delete searchParams.query;
                }
                setUrlSearchParams(searchParams);
              }}
            />
          </div>
          <div>
            <label htmlFor="begin-date">Start:</label>
            <input 
              type="date" 
              id="begin-date"  
              value={searchParams.begin_date || ''}
              onChange={e => {
                let date = e.target.value;
                if (date) {
                  searchParams.begin_date = date;
                } else {
                  delete searchParams.begin_date;
                }
                setUrlSearchParams(searchParams);
              }}
            />
          </div>
          <div>
            <label htmlFor="end-date">End:</label>
            <input 
              type="date" 
              id="end-date"  
              value={searchParams.end_date || ''}
              onChange={e => {
                let date = e.target.value;
                if (date) {
                  searchParams.end_date = date;
                } else {
                  delete searchParams.end_date;
                }
                setUrlSearchParams(searchParams);
              }}
            />
          </div>
          <button 
            type="button" 
            id="submit" 
            onClick={() => this.props.submitNewSearch()}
          >
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
