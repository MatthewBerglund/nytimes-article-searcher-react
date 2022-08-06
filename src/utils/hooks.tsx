import { useState, useEffect } from "react";

export interface Article {
  web_url: string,
  headline: string,
  abstract: string,
  multimedia: Object[],
  keywords: string[]
}

export function useFetchArticles(urlSearchParams: URLSearchParams, currentPage: number) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Perform a search if search params change
  useEffect(() => {
    const getFetchUrl = (urlSearchParams: URLSearchParams): string => {
      const searchParams = Object.fromEntries([...urlSearchParams]);
      const { query, begin_date, end_date, sort } = searchParams;
      const baseURL: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
      const key: string = 'brtQ9fXA0I1ATPctklZe6RcanXZRklYl';
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
    const getActiveFiltersForFetchURL = (glocation: string, newsDesks: string, materialTypes: string): string[] => {
      let activeFilters: string[] = [];

      if (newsDesks) {
        let values = newsDesks.split(',').map(value => `"${value}"`);
        let encodedValues = encodeURIComponent(values.join(' '));
        activeFilters.push(`news_desk:(${encodedValues})`);
      }

      if (materialTypes) {
        let values = materialTypes.split(',').map(value => `"${value}"`);
        let encodedValues = encodeURIComponent(values.join(' '));
        activeFilters.push(`type_of_material:(${encodedValues})`);
      }

      if (glocation) {
        let value = `"${glocation}"`;
        let encodedValue = encodeURIComponent(value);
        activeFilters.push(`glocations.contains:(${encodedValue})`);
      }

      return activeFilters;
    };

    const fetchArticles = async (url: string | URL) => {
      // Do not indicate fetching to user if page has been incremented (pagination)
      setIsLoading(currentPage === 0);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Unable to fetch articles.');
        }

        const searchResults = await response.json();
        const newArticles: Article[] = searchResults.response.docs;

        // If fetching for infinite scrolling, concat new articles to existing ones, 
        // otherwise replace existing articles
        if (currentPage > 0) {
          setArticles([...articles, ...newArticles]);
        } else {
          setArticles(newArticles);
          window.scroll(0, 0);
        }

        setTotalHits(searchResults.response.meta.hits);
      } catch (error) {
        alert(error);
        console.log(error);
      }

      setIsLoading(false);
    };

    if ([...urlSearchParams].length > 0) {
      const url = getFetchUrl(urlSearchParams);
      fetchArticles(url);
    }
  }, [urlSearchParams, currentPage]);

  return { articles, totalHits, isLoading };
}
