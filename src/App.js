import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';
import LoadingMessage from './LoadingMessage';
import PlaceholderArticle from './PlaceholderArticle';
import { useFetchArticles } from './hooks';

function App() {
  // urlSearchParams keys: query, begin_date, end_date, glocation, news_desks, material_types
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const { articles, totalHits, isFetching } = useFetchArticles(urlSearchParams, currentPage);

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
