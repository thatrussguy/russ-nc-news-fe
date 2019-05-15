import React, { useState } from "react";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import { Router } from "@reach/router";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import TopicsPage from "./components/TopicsPage";
import ArticlePage from "./components/ArticlePage";
import LoginCard from "./components/LoginCard";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div className="App">
      <NavBar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        setShowLoginForm={setShowLoginForm}
      />
      {showLoginForm && (
        <LoginCard
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          setShowLoginForm={setShowLoginForm}
        />
      )}
      <Router>
        <HomePage path="/" />
        <TopicsPage path="/topics/*" />
        <ArticlePage path="/articles/:article_id" loggedInUser={loggedInUser} />
      </Router>
    </div>
  );
}

export default App;
