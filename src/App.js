import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>NYT Article Search</h1>
        </header>
        <main>
          <SearchForm />
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
