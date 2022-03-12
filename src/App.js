import React, { useState } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';

function App() {
  const [searchQuery, setSearchQuery] = useState({
    query: '',
    beginDate: null,
    endDate: null
  });
  const [glocationFilter, setGlocationFilter] = useState('');
  const [newsDeskFilter, setNewsDeskFilter] = useState([]);
  const [materialTypeFilter, setMaterialTypeFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('relevance');
  const [articles, setArticles] = useState({});
  const [page, setPage] = useState(0);

  const fetchArticles = async () => {
    const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const key = 'brtQ9fXA0I1ATPctklZe6RcanXZRklYl';
    let fullURL = `${baseURL}?api-key=${key}&page=${page}`;

    fullURL += searchQuery.query ? `&q=${searchQuery.query}` : '';
    fullURL += searchQuery.beginDate ? `&begin_date=${searchQuery.beginDate}` : '';
    fullURL += searchQuery.endDate ? `&end_date=${searchQuery.endDate}` : '';
    fullURL += searchQuery.sortOrder ? `&sort=${searchQuery.sortOrder}` : '';

    const response = await fetch(fullURL);
    const fetchedArticles = await response.json();
    setArticles(fetchedArticles);
  }

  return (
    <div>
      <header>
        <h1>NYT Article Search</h1>
      </header>
      <main>
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          glocationFilter={glocationFilter}
          setGlocationFilter={setGlocationFilter}
          newsDeskFilter={newsDeskFilter}
          setNewsDeskFilter={setNewsDeskFilter}
          materialTypeFilter={materialTypeFilter}
          setMaterialTypeFilter={setMaterialTypeFilter}
          setSortOrder={setSortOrder}
          setPage={setPage}
          fetchArticles={fetchArticles}
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
