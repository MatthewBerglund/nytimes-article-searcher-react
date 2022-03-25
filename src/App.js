import React, { useState, createContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';
import LoadingMessage from './LoadingMessage';
import PlaceholderArticle from './PlaceholderArticle';
import { useFetchArticles } from './hooks';

export const KeywordClickContext = createContext();

function App() {
  // urlSearchParams keys: query, begin_date, end_date, glocation, news_desks, material_types
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const { articles, totalHits, isFetching } = useFetchArticles(urlSearchParams, currentPage);

  const performNewSearch = () => {
    console.log('Performing a new search.');
  }
  
  const performKeywordSearch = (keyword) => {
    const searchParams = Object.fromEntries([...urlSearchParams]);
    searchParams.query = keyword;
    searchParams.sort = 'relevance';
    setCurrentPage(0);
    setUrlSearchParams(searchParams)
  }
  
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
      <KeywordClickContext.Provider value={performKeywordSearch}>
        <SearchResults
          isFetching={isFetching}
          articles={articles}
        />
      </KeywordClickContext.Provider>
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
