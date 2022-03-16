import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchSort from './SearchSort';
import SearchResults from './SearchResults';
import LoadingMessage from './LoadingMessage';
import PlaceholderArticle from './PlaceholderArticle';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  
  const isMounted = useRef(false);

  // If page changes, submit search
  // Do nothing on initial render
  useEffect(() => {
    if (isMounted.current) {
      fetchArticles();
    }
  }, [currentPage]);
  
  // If `sortOrder` changes, either set page back to 0 or submit search
  // Do nothing on initial render
  useEffect(() => {
    if (isMounted.current) {
      if (currentPage !== 0) {
        setCurrentPage(0)
      } else {
        fetchArticles();
      }
    }
  }, [sortOrder]);

  // On initial render, set `isMounted` equal to true
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
  });

  // When SEARCH button is clicked, either reset `sortOrder` or `page`, or submit a search
  const submitNewSearch = () => {
    if (sortOrder !== 'relevance') {
      setSortOrder('relevance');
    } else if (currentPage !== 0) {
      setCurrentPage(0);
    } else {
      fetchArticles();
    }
  }

  const performKeywordSearch = keyword => {
    const searchQuery = {
      query: keyword,
      beginDate: '',
      endDate: ''
    };
    setSearchQuery(searchQuery);
    submitNewSearch();
  }

  const fetchArticles = async () => {
    const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const key = 'brtQ9fXA0I1ATPctklZe6RcanXZRklYl';
    let fullURL = `${baseURL}?api-key=${key}&page=${currentPage}&sort=${sortOrder}`;

    fullURL += searchQuery.query ? `&q=${searchQuery.query}` : '';
    fullURL += searchQuery.beginDate ? `&begin_date=${searchQuery.beginDate}` : '';
    fullURL += searchQuery.endDate ? `&end_date=${searchQuery.endDate}` : '';

    let activeFilters = getActiveFiltersForFetchURL();
    fullURL += activeFilters.length > 0 ? `&fq=${activeFilters.join(' AND ')}` : '';

    setIsFetching(true);
    const response = await fetch(fullURL);
    const searchResults = await response.json();
    const newArticles = searchResults.response.docs;
    
    // If fetching for infinite scrolling, concat new articles to existing ones, 
    // otherwise replace existing articles
    if (currentPage > 0) {
      const prevArticles = articles.slice(0);
      setArticles(prevArticles.concat(newArticles));
    } else {
      setArticles(newArticles);
      window.scroll(0, 0);
    }
    
    setTotalHits(searchResults.response.meta.hits);
    setIsFetching(false);
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

  const renderSearchSort = () => {
    return (
      <SearchSort
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
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
        performKeywordSearch={performKeywordSearch}
      />
    );
  }

  const searchComplete = articles ? true : false;
  const foundArticles = searchComplete && totalHits > 0;

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
          submitNewSearch={submitNewSearch}
        />
        {searchComplete ? renderTotalHits() : null}
        {foundArticles ? renderSearchSort() : null}
        <LoadingMessage isFetching={isFetching} />
        {foundArticles ? renderSearchResults() : null}
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
