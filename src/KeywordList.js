import React from "react";
import Keyword from "./Keyword";

function KeywordList(props) {
  const keywords = props.keywords;

  if (keywords.length > 0) {
    return (
      <ul className="keywords">
        {keywords.map((keyword, index) => {
          return (
            <Keyword 
              key={index}
              keyword={keyword}
            />
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
}

export default KeywordList;
