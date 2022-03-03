import React from 'react';
import NewsdeskFieldset from './NewsdeskFieldset';
import MaterialTypeFieldset from './MaterialTypeFieldset';

class SearchForm extends React.Component {
  filterMenu = React.createRef();
  filtersButton = React.createRef();
  
  toggleFilterMenuVisibility = () => {
    if (this.filterMenu.style.display === '') {
      this.filterMenu.style.display = 'grid';
      this.filtersButton.textContent = 'Hide filters';
    } else {
      this.filterMenu.style.display = '';
      this.filtersButton.textContent = 'Show filters';
    }
  }
  
  render() {
    return (
      <form>
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
        <div id="filters-container" ref={this.filterMenu}>
          <NewsdeskFieldset />
          <MaterialTypeFieldset />
          <div>
            <label htmlFor="location-search">Location:</label>
            <input type="search" id="location-search" />
          </div>
        </div>
        <button id="filters-button" ref={this.filtersButton} onClick={event => {
          event.preventDefault();
          this.toggleFilterMenuVisibility();
        }}>
          Show filters
        </button>
      </form>
    );
  }
}

export default SearchForm;
