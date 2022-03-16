import React from "react";
import Keyword from "./Keyword";

function KeywordList(props) {
  if (props.keywords.length > 0) {
    return (
      <ul className="keywords">
        {props.keywords.map((keyword, index) => {
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
