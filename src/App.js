import React, { useState } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';

function App() {
  const [searchQuery, setSearchQuery] = useState({
    query: '',
    beginDate: '',
    endDate: ''
  });
  const [glocation, setGlocation] = useState('');
  const [newsDesks, setNewsDesks] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
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

    let activeFilters = getActiveFiltersForFetchURL();
    fullURL += activeFilters.length > 0 ? `&fq=${activeFilters.join(' AND ')}` : '';

    const response = await fetch(fullURL);
    const fetchedArticles = await response.json();
    setArticles(fetchedArticles);
  }

  const getActiveFiltersForFetchURL = () => {
    let filters = [];

    if (newsDesks.length > 0) {
      let values = newsDesks.map(value => `"${value}"`);
      let encodedValues = encodeURIComponent(values.join(' '));
      filters.push(`news_desk:(${encodedValues})`);
    }

    if (materialTypes.length > 0) {
      let values = materialTypes.map(value => `"${value}"`);
      let encodedValues = encodeURIComponent(values.join(' '));
      filters.push(`type_of_material:(${encodedValues})`);
    }

    if (glocation) {
      let value = `"${glocation}"`;
      let encodedValue = encodeURIComponent(value);
      filters.push(`glocations.contains:(${encodedValue})`);
    }

    return filters;
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
          glocation={glocation}
          setGlocation={setGlocation}
          newsDesks={newsDesks}
          setNewsDesks={setNewsDesks}
          materialTypes={materialTypes}
          setMaterialTypes={setMaterialTypes}
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
