import React from "react";
import { Router } from "@reach/router";

import TopicList from "./TopicList";
import ArticleList from "./ArticleList";

const TopicsPage = () => {
  return (
    <Router>
      <TopicList path="/" />
      <ArticleList path="/:topic/" />
    </Router>
  );
};

export default TopicsPage;
