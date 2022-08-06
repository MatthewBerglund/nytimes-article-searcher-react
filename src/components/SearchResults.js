import styles from '../styles/SearchResults.module.css';

import Article from './Article';

const SearchResults = ({ articles, isLoading }) => {
  return (
    <ul className={`${styles.list} ${isLoading ? styles.loading : ''}`} >
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
