import Keyword from '../components/Keyword';

const Article = ({ article }) => {
  const { web_url, headline, abstract, multimedia, keywords } = article;

  const thumbnail = multimedia.find(image => image.subtype === 'blog225');

  return (
    <li>
      <article>
        <a href={web_url} target="_blank" className="headline-link">
          <h2>{headline.main}</h2>
        </a>
        {abstract ? (
          <p className="article-abstract">{abstract}</p>
        ) : null}
        {thumbnail ? (
          <img
            src={`http://www.nytimes.com/${thumbnail.url}`}
            className="article-img"
            alt="article thumbnail"
          />
        ) : null}
        {keywords.length > 0 ? (
          <ul className="keywords">
            {keywords.map((keyword, index) => (
              <Keyword key={index} keyword={keyword} />
            ))}
          </ul>
        ) : null}
      </article>
    </li>
  );
}

export default Article;
