import React, { useEffect, useState } from 'react';
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
  const [articles, setArticles] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchComplete = articles ? true : false;
  const foundArticles = searchComplete && totalHits > 0;

  useEffect(() => {
    if (isSearching === true) {
      fetchArticles().then(() => setIsSearching(false));
    }
  });

  const fetchArticles = async () => {
    const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const key = 'brtQ9fXA0I1ATPctklZe6RcanXZRklYl';
    let fullURL = `${baseURL}?api-key=${key}&page=${page}&sort=${sortOrder}`;

    fullURL += searchQuery.query ? `&q=${searchQuery.query}` : '';
    fullURL += searchQuery.beginDate ? `&begin_date=${searchQuery.beginDate}` : '';
    fullURL += searchQuery.endDate ? `&end_date=${searchQuery.endDate}` : '';

    let activeFilters = getActiveFiltersForFetchURL();
    fullURL += activeFilters.length > 0 ? `&fq=${activeFilters.join(' AND ')}` : '';

    const response = await fetch(fullURL);
    const searchResults = await response.json();
    setArticles(searchResults.response.docs);
    setTotalHits(searchResults.response.meta.hits);
  }

  // Encode all active filter fields and values and return them 
  // in an array for insertion into the API fetch URL
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

  const renderLoadingMessage = () => {
    return (
      <div id="loading-msg">
        <p>Loading...</p>
      </div>
    );
  }

  const renderSearchSort = () => {
    return (
      <SearchSort
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        fetchArticles={fetchArticles}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setPage={setPage}
      />
    );
  }

  const renderTotalHits = () => {
    return (
      <div id="total-hits-container">
        <p>Your search returned {totalHits} hits.</p>
      </div>
    );
  }

  const renderSearchResults = () => {
    return (
      <SearchResults
        isSearching={isSearching}
        articles={articles}
        fetchArticles={fetchArticles}
      />
    );
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
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        {searchComplete ? renderTotalHits() : null}
        {foundArticles ? renderSearchSort() : null}
        {isSearching ? renderLoadingMessage() : null}
        {foundArticles ? renderSearchResults() : null}
      </main>
    </div>
  );
}

export default App;
