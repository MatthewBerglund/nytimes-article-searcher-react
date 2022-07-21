import Article from './Article';

const SearchResults = ({ articles, isLoading }) => {
  return (
    <ul id="articles-container" className={isLoading ? 'loading' : ''}>
      {articles.map(article =>
        <Article key={article._id} article={article} />
      )}
    </ul>
  );
}

export default SearchResults;
