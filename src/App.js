import React, { useState } from "react";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import { Router } from "@reach/router";

import NavBar from "./components/NavBar";
import TopicsPage from "./components/TopicsPage";
import ArticlePage from "./components/ArticlePage";
import ArticleList from "./components/ArticleList";
import LoginCard from "./components/LoginCard";
import ErrorCard from "./components/ErrorCard";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
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
        <Router>
          <ArticleList path="/" loggedInUser={loggedInUser} />
          <TopicsPage path="/topics/*" loggedInUser={loggedInUser} />
          <ArticlePage
            path="/articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <ArticleList path="/:author/articles" loggedInUser={loggedInUser} />
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
