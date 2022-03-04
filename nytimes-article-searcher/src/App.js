import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
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
          <SearchResults />
        </main>
      </div>
    );
  }
}

export default App;
