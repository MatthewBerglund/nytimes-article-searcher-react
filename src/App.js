import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';
import {camelCaseify} from './helpers';

class App extends React.Component {
  state = {
    search: {
      query: '',
      begin: '',
      end: ''
    }
  }

  addFiltersToState = filtersArray => {
    const search = {...this.state.search};
    
    filtersArray.forEach(filter => {
      const filterType = camelCaseify(filter.filterType);
      const labels = filter.labels;
      search[filterType] = {};

      labels.forEach(label => {
        label = camelCaseify(label);
        
        search[filterType][label] = {
          isChecked: false
        }
      });
    });
    
    this.setState({
      search
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>NYT Article Search</h1>
        </header>
        <main>
          <SearchForm addFiltersToState={this.addFiltersToState} />
          <div id="total-hits-container">
            <p>Your search returned 123 hits.</p>
          </div>
          <SearchSort />
          <p id="loading-msg">Loading...</p>
          <SearchResults />
        </main>
      </div>
    );
  }
}

export default App;
