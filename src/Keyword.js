import React from "react";

function Keyword(props) {
  return (
    <li className="keyword" tabIndex="0">
      <a onClick={() => props.performKeywordSearch(props.keyword.value)}>
        {props.keyword.value}
      </a>
    </li>
  );
}

export default Keyword;
