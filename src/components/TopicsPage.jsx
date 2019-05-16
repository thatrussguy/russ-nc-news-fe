import React from "react";
import { Router } from "@reach/router";

import TopicList from "./TopicList";
import ArticleList from "./ArticleList";

const TopicsPage = ({ loggedInUser }) => {
  return (
    <Router>
      <TopicList path="/" />
      <ArticleList path="/:topic/" loggedInUser={loggedInUser} />
    </Router>
  );
};

export default TopicsPage;
