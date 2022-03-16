import React from "react";

function Keyword(props) {
  return (
    <li className="keyword" tabIndex="0">
      <a>{props.keyword.value}</a>
    </li>
  );
}

export default Keyword;
