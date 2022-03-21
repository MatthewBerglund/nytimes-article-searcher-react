import React from "react";

function ArticleThumbnail(props) {
  if (props.thumbnail) {
    return (
      <img
        src={`http://www.nytimes.com/${props.thumbnail.url}`} 
        className="article-img"
      />
    );
  } else {
    return null;
  }
}

export default ArticleThumbnail;
