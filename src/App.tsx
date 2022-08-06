import React from 'react';
import { useState, createContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchForm from './components/SearchForm';
import SearchSort from './components/SearchSort'
import SearchResults from './components/SearchResults';
import PlaceholderArticle from './components/PlaceholderArticle';
import Hits from './components/Hits';
import Loading from './components/Loading';

import './styles/Global.css';

import { useFetchArticles } from './utils/hooks';

export const KeywordClickContext = createContext((_keyword: string) => { });

const App: React.FC<{}> = () => {
  // urlSearchParams keys: query, begin_date, end_date, glocation, news_desks, material_types
  const [currentPage, setCurrentPage] = useState(0);

  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const { articles, totalHits, isLoading } = useFetchArticles(urlSearchParams, currentPage);

  // API limits pagination to 1000 articles (100 pages)
  const totalScrollableHits = (totalHits > 1000) ? 1000 : totalHits;
  const totalScrollablePages = Math.floor(totalScrollableHits / 10);

  const performKeywordSearch = (keyword: string) => {
    const searchParams = Object.fromEntries([...urlSearchParams]);
    searchParams.query = keyword;
    searchParams.sort = 'relevance';
    setCurrentPage(0);
    setUrlSearchParams(searchParams);
  }

  const sortSearchResults = (sortOrder: string) => {
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
          <Hits total={totalHits} />
        ) : null}
        {totalHits > 0 ? (
          <SearchSort
            sortSearchResults={sortSearchResults}
            urlSearchParams={urlSearchParams}
          />
        ) : null}
        {isLoading ? (
          <Loading />
        ) : null}
        {totalHits > 0 ? (
          <KeywordClickContext.Provider value={performKeywordSearch}>
            <SearchResults isLoading={isLoading} articles={articles} />
          </KeywordClickContext.Provider>
        ) : null}
        {currentPage < totalScrollablePages ? (
          <PlaceholderArticle setCurrentPage={setCurrentPage} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
