import React from 'react';

function PlaceholderArticle(props) {
  // API limits pagination to 1000 articles (100 pages)
  const totalScrollableHits = (props.totalHits > 1000) ? 1000 : props.totalHits;
  const totalScrollablePages = Math.floor(totalScrollableHits / 10);

  if (props.currentPage === totalScrollablePages) {
    return null;
  } else {
    return (
      <div id="pagination-trigger">
        <article id="placeholder-article" className="article">
          <div className="placeholder-headline placeholder-content"></div>
          <div className="article-abstract placeholder-abstract placeholder-content"></div>
          <div className="article-img placeholder-img placeholder-content"></div>
          <div className="keywords placeholder-keywords placeholder-content"></div>
        </article>
      </div>
    );
  }
}

export default PlaceholderArticle;
