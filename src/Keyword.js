import React from "react";

function Keyword(props) {
  const { keyword, urlSearchParams, setUrlSearchParams, setCurrentPage } = props;

  return (
    <li className="keyword" tabIndex="0">
      <a onClick={() => {
        const searchParams = Object.fromEntries([...urlSearchParams]);
        searchParams.query = keyword.value;
        searchParams.sort = 'relevance';
        setCurrentPage(0);
        setUrlSearchParams(searchParams);
      }}>
        {keyword.value}
      </a>
    </li>
  );
}

export default Keyword;
