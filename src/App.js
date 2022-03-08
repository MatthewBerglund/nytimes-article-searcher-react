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
      end: '',
      glocation: '',
      sortBy: 'relevance'
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

  setInputState = event => {
    const search = {...this.state.search}
    const input = event.target;
    const name = input.name;

    if (input.type === 'checkbox') {
      const fieldset = input.dataset.fieldset;
      const filterType = search[fieldset];
      Object.keys(filterType).forEach(key => {
        if (key === name) {
          filterType[key].isChecked = !filterType[key].isChecked;
        }
      });
    } else {
      search[name] = input.value;
    }

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
          <SearchForm 
            search={this.state.search}
            addFiltersToState={this.addFiltersToState}
            setInputState={this.setInputState} 
          />
          <div id="total-hits-container">
            <p>Your search returned 123 hits.</p>
          </div>
          <SearchSort
            search={this.state.search}
            setInputState={this.setInputState} 
          />
          <p id="loading-msg">Loading...</p>
          <SearchResults />
        </main>
      </div>
    );
  }
}

export default App;
