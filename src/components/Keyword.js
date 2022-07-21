import { useContext } from "react";

import { KeywordClickContext } from "../App";

const Keyword = ({ keyword }) => {
  const performKeywordSearch = useContext(KeywordClickContext);

  return (
    <li className="keyword" tabIndex="0">
      <a onClick={() => performKeywordSearch(keyword.value)}>
        {keyword.value}
      </a>
    </li>
  );
}

export default Keyword;
