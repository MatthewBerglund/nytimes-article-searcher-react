import { useState, useRef, useEffect } from 'react';

import Fieldset from './Fieldset';

import { getValuesFromFieldset } from '../utils/helpers';

import styles from '../styles/SearchForm.module.css';

const SearchForm = ({ urlSearchParams, setUrlSearchParams, setCurrentPage }) => {
  const [showFilters, setShowFilters] = useState(false);

  const query = useRef(null);
  const beginDate = useRef(null);
  const endDate = useRef(null);
  const glocation = useRef(null);
  const newsDesks = useRef(null);
  const materialTypes = useRef(null);

  // If query param is updated by another component (e.g. Keyword),
  // update corresponding input element in search form
  useEffect(() => {
    let queryParam = urlSearchParams.get('query');
    query.current.value = queryParam ? queryParam : '';
  });

  const filters = {
    newsDesks: [
      'Arts',
      'Business',
      'Culture',
      'Home & Garden',
      'Health & Fitness',
      'Fashion & Style',
      'Politics',
      'Science',
      'Sports',
      'Travel'
    ],
    materialTypes: [
      'News',
      'Interview',
      'Editorial',
      'Archives',
      'Op-ed'
    ]
  };

  const submitNewSearch = () => {
    const searchParams = { sort: 'relevance' };

    if (query.current.value) {
      searchParams.query = query.current.value;
    }

    if (beginDate.current.value) {
      searchParams.begin_date = beginDate.current.value;
    }

    if (endDate.current.value) {
      searchParams.end_date = endDate.current.value;
    }

    if (glocation.current.value) {
      searchParams.glocation = glocation.current.value;
    }

    const newsDeskValues = getValuesFromFieldset(newsDesks.current);
    if (newsDeskValues.length > 0) {
      searchParams.news_desks = newsDeskValues.join(',');
    }

    const materialTypeValues = getValuesFromFieldset(materialTypes.current);
    if (materialTypeValues.length > 0) {
      searchParams.material_types = materialTypeValues.join(',');
    }

    setCurrentPage(0);
    setUrlSearchParams(searchParams);
  }

  const searchParams = Object.fromEntries([...urlSearchParams]);

  return (
    <form>
      <div className={styles.controls}>
        <div>
          <input
            type="search"
            id="query-input"
            ref={query}
            placeholder="Enter a search term"
            defaultValue={searchParams.query || ''}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                submitNewSearch();
              };
            }}
          />
        </div>
        <div>
          <label htmlFor="begin-date">Start:</label>
          <input
            type="date"
            id="begin-date"
            ref={beginDate}
            defaultValue={searchParams.begin_date || ''}
          />
        </div>
        <div>
          <label htmlFor="end-date">End:</label>
          <input
            type="date"
            id="end-date"
            ref={endDate}
            defaultValue={searchParams.end_date || ''}
          />
        </div>
        <button
          type="button"
          id="submit"
          onClick={submitNewSearch}
        >
          Search
        </button>
      </div>
      <div className={`${styles.filters} ${showFilters ? styles.open : ''}`}>
        <div>
          <Fieldset
            name="News desks"
            values={filters.newsDesks}
            ref={newsDesks}
          />
        </div>
        <div>
          <Fieldset
            name="Material types"
            values={filters.materialTypes}
            ref={materialTypes}
          />
        </div>
        <div>
          <label htmlFor="location-search">Location:</label>
          <input
            type="search"
            id="location-search"
            ref={glocation}
            defaultValue={searchParams.glocation || ''}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                submitNewSearch();
              };
            }}
          />
        </div>
      </div>
      <button
        type="button"
        className={styles.filters_btn}
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide filters' : 'Show filters'}
      </button>
    </form>
  );
}

export default SearchForm;
