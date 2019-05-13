import React from "react";
import ArticleList from "./ArticleList";

const OneTopic = ({ topic }) => {
  return (
    <div>
      <h2>{topic}</h2>
      <ArticleList topic={topic} />
    </div>
  );
};

export default OneTopic;
