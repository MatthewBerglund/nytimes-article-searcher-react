import styles from './SearchResults.module.css';

import Article from './Article';

const SearchResults = ({ articles, isLoading }) => {
  return (
    <ul id="articles-container" className={isLoading ? styles.loading : ''} >
      {
        articles.map(article =>
          <li key={article._id}>
            <Article article={article} />
          </li>
        )
      }
    </ul >
  );
}

export default SearchResults;
