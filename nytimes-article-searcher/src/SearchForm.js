import React from 'react';
import NewsdeskFieldset from './NewsdeskFieldset';
import MaterialTypeFieldset from './MaterialTypeFieldset';

class SearchForm extends React.Component {
  state = {
    isMenuOpen: false
  };
  
  render() {
    return (
      <form onSubmit={this.handleSearchSubmit}>
        <div id="search-controls-container">
          <div>
            <input id="query-input" type="search" placeholder="Enter a search term" />
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
        <div id="filters-container" className={this.state.isMenuOpen ? 'open' : ''}>
          <NewsdeskFieldset />
          <MaterialTypeFieldset />
          <div>
            <label htmlFor="location-search">Location:</label>
            <input type="search" id="location-search" />
          </div>
        </div>
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
