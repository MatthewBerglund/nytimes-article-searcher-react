import React, { useState } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';

function App() {
  const [query, setQuery] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [glocationFilter, setGlocationFilter] = useState('');
  const [newsDeskFilter, setNewsDeskFilter] = useState([]);
  const [materialTypeFilter, setMaterialTypeFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('relevance');

  return (
    <div>
      <header>
        <h1>NYT Article Search</h1>
      </header>
      <main>
        <SearchForm
          query={query}
          setQuery={setQuery}
          beginDate={beginDate}
          setBeginDate={setBeginDate}
          endDate={endDate}
          setEndDate={setEndDate}
          glocationFilter={glocationFilter}
          setGlocationFilter={setGlocationFilter}
          newsDeskFilter={newsDeskFilter}
          setNewsDeskFilter={setNewsDeskFilter}
          materialTypeFilter={materialTypeFilter}
          setMaterialTypeFilter={setMaterialTypeFilter}
        />
        <div id="total-hits-container">
          <p>Your search returned 123 hits.</p>
        </div>
        <SearchSort
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <p id="loading-msg">Loading...</p>
        <SearchResults />
      </main>
    </div>
  );
}

export default App;
