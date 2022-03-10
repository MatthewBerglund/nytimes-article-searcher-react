import React, { useState } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';

function App() {
  const [search, setSearch] = useState({
    query: '',
    begin: '',
    end: '',
    glocation: '',
    sortBy: 'relevance',
    newsDesk: [],
    typeOfMaterial: []
  });

  return (
    <div>
      <header>
        <h1>NYT Article Search</h1>
      </header>
      <main>
        <SearchForm
          search={search}
          setSearch={setSearch}
        />
        <div id="total-hits-container">
          <p>Your search returned 123 hits.</p>
        </div>
        <SearchSort
          search={search}
          setSearch={setSearch}
        />
        <p id="loading-msg">Loading...</p>
        <SearchResults />
      </main>
    </div>
  );
}

export default App;
