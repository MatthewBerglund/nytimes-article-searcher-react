import React, { useRef, useState, useEffect } from 'react';

// A placeholder article item that increments `currentPage` when it intersects the viewport
function PlaceholderArticle(props) {
  const paginationTrigger = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (paginationTrigger.current) {
      const viewPortObserver = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      viewPortObserver.observe(paginationTrigger.current);
    }
  });

  useEffect(() => {
    if (isIntersecting) {
      props.setCurrentPage(currentPage => currentPage + 1);
    }
  }, [isIntersecting]);

  const handleIntersection = entries => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
  }

  // API limits pagination to 1000 articles (100 pages)
  const totalScrollableHits = (props.totalHits > 1000) ? 1000 : props.totalHits;
  const totalScrollablePages = Math.floor(totalScrollableHits / 10);

  if (props.currentPage < totalScrollablePages) {
    return (
      <div id="pagination-trigger" ref={paginationTrigger}>
        <article id="placeholder-article" className="article">
          <div className="placeholder-headline placeholder-content"></div>
          <div className="article-abstract placeholder-abstract placeholder-content"></div>
          <div className="article-img placeholder-img placeholder-content"></div>
          <div className="keywords placeholder-keywords placeholder-content"></div>
        </article>
      </div>
    );
  } else {
    return null;
  }
}

export default PlaceholderArticle;
