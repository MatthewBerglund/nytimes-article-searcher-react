import { useRef, useState, useEffect } from 'react';

import article from './Article';
import placeholder from '../styles/PlaceholderArticle.module.css';

// A placeholder article item that increments `currentPage` when it intersects the viewport
function PlaceholderArticle({ setCurrentPage }) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const paginationTrigger = useRef(null);

  useEffect(() => {
    if (paginationTrigger.current) {
      const viewPortObserver = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      viewPortObserver.observe(paginationTrigger.current);
    }
  });

  useEffect(() => {
    if (isIntersecting) {
      setCurrentPage(currentPage => currentPage + 1);
    }
  }, [isIntersecting, setCurrentPage]);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
  }

  return (
    <div className={placeholder.pagination_trigger} ref={paginationTrigger}>
      <article id="placeholder-article" className={article.article}>
        <div className={`${placeholder.content} ${placeholder.headline}`}></div>
        <div className={`${article.abstract} ${placeholder.abstract} ${placeholder.content}`}></div>
        <div className={`${article.thumbnail} ${placeholder.thumbnail} ${placeholder.content}`}></div>
        <div className={`${article.keywords} ${placeholder.keywords} ${placeholder.content}`}></div>
      </article >
    </div >
  );
}

export default PlaceholderArticle;
