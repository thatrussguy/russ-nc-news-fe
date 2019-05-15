import React, { useState } from "react";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.css";

import { Router } from "@reach/router";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import TopicsPage from "./components/TopicsPage";
import ArticlePage from "./components/ArticlePage";
import LoginPage from "./components/LoginPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Router>
        <HomePage path="/" />
        <TopicsPage path="/topics/*" />
        <ArticlePage path="/articles/:article_id" loggedInUser={loggedInUser} />
        <LoginPage
          path="/login"
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
      </Router>
    </div>
  );
}

export default App;
