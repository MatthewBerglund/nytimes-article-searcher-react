const SearchSort = ({ urlSearchParams, sortSearchResults }) => {
  const searchParams = Object.fromEntries([...urlSearchParams]);

  return (
    <div id="sort-order-container">
      <label htmlFor="sort-order-select">Sort by:</label>
      <select
        name="sortOrder"
        id="sort-order-select"
        value={searchParams.sort || 'relevance'}
        onChange={e => sortSearchResults(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="relevance">Relevance</option>
      </select>
    </div>
  );
}

export default SearchSort;
