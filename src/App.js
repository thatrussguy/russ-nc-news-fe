import React, { useState } from "react";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import { Router } from "@reach/router";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Router>
        <HomePage path="/" />
        {/* <ArticleList path="/:currentPage" />
        <Article path="/articles/:article_id" />
        <TopicList path="/topics" />
        <ArticleList path="/topics/:topic/" />
        <ArticleList path="/topics/:topic/:currentPage" /> */}
      </Router>
    </div>
  );
}

export default App;
