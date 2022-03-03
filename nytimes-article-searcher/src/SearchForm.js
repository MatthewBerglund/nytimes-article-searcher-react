import React from 'react';
import NewsdeskFieldset from './NewsdeskFieldset';
import MaterialTypeFieldset from './MaterialTypeFieldset';

class SearchForm extends React.Component {
  render() {
    return (
      <form>
        <div id="search-controls-container">
          <div>
            <input id="query-input" type="search" placeholder="Enter a search term" />
          </div>
          <div>
            <label for="begin-date">Start:</label>
            <input id="begin-date" type="date" />
          </div>
          <div>
            <label for="end-date">End:</label>
            <input id="end-date" type="date" />
          </div>
          <button id="submit">Search</button>
        </div>
        <div id="filters-container">
          <NewsdeskFieldset />
          <MaterialTypeFieldset />
        </div>
      </form>
    );
  }
}

export default SearchForm;
