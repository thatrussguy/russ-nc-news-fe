import React, { useState } from "react";

import "./App.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Router } from "@reach/router";

import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import ErrorCard from "./components/ErrorCard";
import LoginCard from "./components/LoginCard";
import NavBar from "./components/NavBar";
import TopicList from "./components/TopicList";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser") || null
  );
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        setShowLoginForm={setShowLoginForm}
      />
      <div className="App">
        {showLoginForm && (
          <LoginCard
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            setShowLoginForm={setShowLoginForm}
          />
        )}
        <Router role="main">
          <ArticleList path="/" loggedInUser={loggedInUser} />
          <ArticlePage
            path="/articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <ArticleList path="/authors/:author" loggedInUser={loggedInUser} />
          <TopicList path="/topics" loggedInUser={loggedInUser} />
          <ArticleList path="/topics/:topic" loggedInUser={loggedInUser} />
          <ErrorCard
            default
            error={{ status: 404, message: "Nothing found at this address" }}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
