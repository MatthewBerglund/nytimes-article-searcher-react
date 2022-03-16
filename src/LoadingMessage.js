import React from "react";

function LoadingMessage(props) {
  const message = (
    <div id="loading-msg">
      <p>Loading...</p>
    </div>
  );
  
  if (props.isFetching) {
    return message;
  } else {
    return null;
  }
}

export default LoadingMessage;
