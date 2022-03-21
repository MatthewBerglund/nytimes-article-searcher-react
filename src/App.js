import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';
import LoadingMessage from './LoadingMessage';
import PlaceholderArticle from './PlaceholderArticle';

function App() {
  // urlSearchParams keys: query, begin_date, end_date, glocation, news_desks, material_types
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // Perform a search if search params change
  useEffect(() => {
    const fetchArticles = async () => {
      // Do not indicate fetching to user if currentPage has been incremented (pagination)
      setIsFetching(currentPage === 0);

      const searchParams = Object.fromEntries([...urlSearchParams]);
      const { query, begin_date, end_date, sort } = searchParams;
      const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
      const key = 'brtQ9fXA0I1ATPctklZe6RcanXZRklYl';
      let fullURL = `${baseURL}?api-key=${key}&page=${currentPage}&sort=${sort}`;

      fullURL += query ? `&q=${query}` : '';
      fullURL += begin_date ? `&begin_date=${begin_date}` : '';
      fullURL += end_date ? `&end_date=${end_date}` : '';

      let activeFilters = getActiveFiltersForFetchURL();
      fullURL += activeFilters.length > 0 ? `&fq=${activeFilters.join(' AND ')}` : '';

      const response = await fetch(fullURL);
      const searchResults = await response.json();
      const newArticles = searchResults.response.docs;

      // If fetching for infinite scrolling, concat new articles to existing ones, 
      // otherwise replace existing articles
      if (currentPage > 0) {
        setArticles(articles => [...articles, ...newArticles]);
      } else {
        setArticles(newArticles);
        window.scroll(0, 0);
      }

      setTotalHits(searchResults.response.meta.hits);
      setIsFetching(false);
    };

    // Encode all active filter fields and values and return them 
    // in an array for insertion into the API fetch URL
    const getActiveFiltersForFetchURL = () => {
      const searchParams = Object.fromEntries([...urlSearchParams]);
      let { glocation, news_desks, material_types } = searchParams;
      let fetchFilters = [];

      if (news_desks) {
        const newsDesks = news_desks.split(',');
        let values = newsDesks.map(value => `"${value}"`);
        let encodedValues = encodeURIComponent(values.join(' '));
        fetchFilters.push(`news_desk:(${encodedValues})`);
      }

      if (material_types) {
        const materialTypes = material_types.split(',');
        let values = materialTypes.map(value => `"${value}"`);
        let encodedValues = encodeURIComponent(values.join(' '));
        fetchFilters.push(`type_of_material:(${encodedValues})`);
      }

      if (glocation) {
        let value = `"${glocation}"`;
        let encodedValue = encodeURIComponent(value);
        fetchFilters.push(`glocations.contains:(${encodedValue})`);
      }

      return fetchFilters;
    };

    const searchParams = [...urlSearchParams];
    
    if (searchParams.length > 0) {
      fetchArticles();
    }
  }, [urlSearchParams, currentPage]);

  const renderSearchSort = () => {
    return (
      <SearchSort
        urlSearchParams={urlSearchParams}
        setUrlSearchParams={setUrlSearchParams}
        setCurrentPage={setCurrentPage}
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
        isFetching={isFetching}
        articles={articles}
        urlSearchParams={urlSearchParams}
        setUrlSearchParams={setUrlSearchParams}
        setCurrentPage={setCurrentPage}
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
          urlSearchParams={urlSearchParams}
          setUrlSearchParams={setUrlSearchParams}
          setCurrentPage={setCurrentPage}
        />
        {articles ? renderTotalHits() : null}
        {totalHits > 0 ? renderSearchSort() : null}
        <LoadingMessage isFetching={isFetching} />
        {totalHits > 0 ? renderSearchResults() : null}
        <PlaceholderArticle 
          totalHits={totalHits} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
}

export default App;
