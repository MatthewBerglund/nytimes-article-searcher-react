import React, { useContext } from "react";
import { KeywordClickContext } from "./App";

function Keyword({ keyword }) {
  const performKeywordSearch = useContext(KeywordClickContext);

  return (
    <li className="keyword" tabIndex="0">
      <a onClick={e => performKeywordSearch(keyword.value)}>
        {keyword.value}
      </a>
    </li>
  );
}

export default Keyword;
