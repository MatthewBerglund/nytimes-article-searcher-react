import React from "react";

function Keyword(props) {
  return (
    <li className="keyword" tabIndex="0">
      <a onClick={() => {
        const searchParams = Object.fromEntries([...props.urlSearchParams]);
        searchParams.query = props.keyword.value;
        searchParams.sort = 'relevance';
        props.setCurrentPage(0);
        props.setUrlSearchParams(searchParams);
      }}>
        {props.keyword.value}
      </a>
    </li>
  );
}

export default Keyword;
