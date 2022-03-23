import { useState, useEffect } from "react";

export function useFetchArticles(urlSearchParams, currentPage) {
  const [articles, setArticles] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // Perform a search if search params change
  useEffect(() => {
    const getFetchUrl = (urlSearchParams) => {
      const searchParams = Object.fromEntries([...urlSearchParams]);
      const { query, begin_date, end_date, sort} = searchParams;
      const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
      const key = 'brtQ9fXA0I1ATPctklZe6RcanXZRklYl';
      let fullURL = `${baseURL}?api-key=${key}&page=${currentPage}&sort=${sort}`;
      
      fullURL += query ? `&q=${query}` : '';
      fullURL += begin_date ? `&begin_date=${begin_date}` : '';
      fullURL += end_date ? `&end_date=${end_date}` : '';

      const { glocation, news_desks, material_types } = searchParams;
      let activeFilters = getActiveFiltersForFetchURL(glocation, news_desks, material_types);
      fullURL += activeFilters.length > 0 ? `&fq=${activeFilters.join(' AND ')}` : '';
      return fullURL;
    }

    // Encode all active filter fields and values and return them 
    // in an array for insertion into the API fetch URL
    const getActiveFiltersForFetchURL = (glocation, newsDesks, materialTypes) => {
      let fetchFilters = [];

      if (newsDesks) {
        const newsDesks = newsDesks.split(',');
        let values = newsDesks.map(value => `"${value}"`);
        let encodedValues = encodeURIComponent(values.join(' '));
        fetchFilters.push(`news_desk:(${encodedValues})`);
      }

      if (materialTypes) {
        const materialTypes = materialTypes.split(',');
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
    
    const fetchArticles = async (url) => {
      // Do not indicate fetching to user if page has been incremented (pagination)
      setIsFetching(currentPage === 0);
      const response = await fetch(url);
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

    if ([...urlSearchParams].length > 0) {
      const url = getFetchUrl(urlSearchParams);
      fetchArticles(url);
    }
  }, [urlSearchParams, currentPage]);

  return { articles, totalHits, isFetching };
}
