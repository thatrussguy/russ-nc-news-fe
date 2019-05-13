import React from "react";
import { Router } from "@reach/router";
import "./App.css";

import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import ArticleList from "./components/ArticleList";
import TopicList from "./components/TopicList";

function App() {
  return (
    <div className="App">
      <Header />
      <NavigationBar />
      <Router>
        <ArticleList path="/" />
        <TopicList path="/topics/*" />
      </Router>
    </div>
  );
}

export default App;
