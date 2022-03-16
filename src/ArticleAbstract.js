import React from "react";

function ArticleAbstract(props) {
  if (props.abstract) {
    return (
      <p className="article-abstract">
        {props.abstract}
      </p>
    );
  } else {
    return null;
  }
}

export default ArticleAbstract;
