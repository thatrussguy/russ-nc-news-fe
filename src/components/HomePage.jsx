import React from "react";

import ArticleList from "./ArticleList";

const HomePage = ({ loggedInUser }) => {
  return <ArticleList loggedInUser={loggedInUser} />;
};

export default HomePage;
