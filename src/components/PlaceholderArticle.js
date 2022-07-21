import { useRef, useState, useEffect } from 'react';

// A placeholder article item that increments `currentPage` when it intersects the viewport
function PlaceholderArticle({ currentPage, setCurrentPage, totalHits }) {
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

  // API limits pagination to 1000 articles (100 pages)
  const totalScrollableHits = (totalHits > 1000) ? 1000 : totalHits;
  const totalScrollablePages = Math.floor(totalScrollableHits / 10);

  return currentPage < totalScrollablePages ? (
    <div id="pagination-trigger" ref={paginationTrigger}>
      <article id="placeholder-article" className="article">
        <div className="placeholder-headline placeholder-content"></div>
        <div className="article-abstract placeholder-abstract placeholder-content"></div>
        <div className="article-img placeholder-img placeholder-content"></div>
        <div className="keywords placeholder-keywords placeholder-content"></div>
      </article>
    </div>
  ) : null;
}

export default PlaceholderArticle;
