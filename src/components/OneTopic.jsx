import React from "react";
import { Router } from "@reach/router";
import ArticleList from "./ArticleList";

const OneTopic = ({ topic }) => {
  return (
    <div>
      <h2>{topic}</h2>
      <Router>
        <ArticleList path="/*" />
      </Router>
    </div>
  );
};

export default OneTopic;
