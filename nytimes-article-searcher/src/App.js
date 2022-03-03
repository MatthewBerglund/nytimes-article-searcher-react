import React from 'react';
import './App.css';
import SearchForm from './SearchForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>NYT Article Search</h1>
        </header>
        <main>
          <SearchForm />
        </main>
      </div>
    );
  }
}

export default App;
