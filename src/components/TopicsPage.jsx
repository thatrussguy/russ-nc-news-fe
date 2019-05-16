import React from "react";
import { Router } from "@reach/router";

import TopicList from "./TopicList";
import ArticleList from "./ArticleList";
import ErrorCard from "./ErrorCard";

const TopicsPage = ({ loggedInUser }) => {
  return (
    <Router>
      <TopicList path="/" />
      <ArticleList path="/:topic" loggedInUser={loggedInUser} />
      <ErrorCard default loggedInUser={loggedInUser} error={{ status: 404, message: "Nothing found at this address" }}/>
    </Router>
  );
};

export default TopicsPage;
