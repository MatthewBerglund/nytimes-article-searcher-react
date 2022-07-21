import { useState, createContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchForm from './components/SearchForm';
import SearchSort from './components/SearchSort'
import SearchResults from './components/SearchResults';
import PlaceholderArticle from './components/PlaceholderArticle';

import './App.css';

import { useFetchArticles } from './utils/hooks';

export const KeywordClickContext = createContext();

const App = () => {
  // urlSearchParams keys: query, begin_date, end_date, glocation, news_desks, material_types
  const [currentPage, setCurrentPage] = useState(0);

  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const { articles, totalHits, isLoading } = useFetchArticles(urlSearchParams, currentPage);

  const performKeywordSearch = (keyword) => {
    const searchParams = Object.fromEntries([...urlSearchParams]);
    searchParams.query = keyword;
    searchParams.sort = 'relevance';
    setCurrentPage(0);
    setUrlSearchParams(searchParams)
  }

  const sortSearchResults = (sortOrder) => {
    const searchParams = Object.fromEntries([...urlSearchParams]);
    searchParams.sort = sortOrder;
    setCurrentPage(0);
    setUrlSearchParams(searchParams);
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
        {articles ? (
          <div id="total-hits-container">
            <p>Your search returned {totalHits} hits.</p>
          </div>
        ) : null}
        {totalHits > 0 ? (
          <SearchSort
            sortSearchResults={sortSearchResults}
            urlSearchParams={urlSearchParams}
          />
        ) : null}
        {isLoading ? (
          <div id="loading-msg">
            <p>Loading...</p>
          </div>
        ) : null}
        {totalHits > 0 ? (
          <KeywordClickContext.Provider value={performKeywordSearch}>
            <SearchResults isLoading={isLoading} articles={articles} />
          </KeywordClickContext.Provider>
        ) : null}
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
