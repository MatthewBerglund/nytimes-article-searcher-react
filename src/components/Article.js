import styles from './Article.module.css';

import Keyword from '../components/Keyword';

const Article = ({ article }) => {
  const { web_url, headline, abstract, multimedia, keywords } = article;

  const thumbnail = multimedia.find(image => image.subtype === 'blog225');

  return (
    <article>
      <a href={web_url} target="_blank" className={styles.headline}>
        <h2>{headline.main}</h2>
      </a>
      {abstract ? (
        <p className={styles.abstract}>{abstract}</p>
      ) : null}
      {thumbnail ? (
        <img
          src={`http://www.nytimes.com/${thumbnail.url}`}
          className={styles.thumbnail}
          alt="article thumbnail"
        />
      ) : null}
      {keywords.length > 0 ? (
        <ul className={styles.keywords}>
          {keywords.map((keyword, index) => (
            <Keyword key={index} keyword={keyword} />
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default Article;
