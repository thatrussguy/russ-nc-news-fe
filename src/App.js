import React from "react";
import { Router } from "@reach/router";
import "./App.css";

import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import ArticleList from "./components/ArticleList";
import TopicList from "./components/TopicList";
import Article from "./components/Article";

function App() {
  return (
    <div className="App">
      <Header />
      <NavigationBar />
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/:currentPage" />
        <Article path="/articles/:article_id" />
        <TopicList path="/topics" />
        <ArticleList path="/topics/:topic/" />
        <ArticleList path="/topics/:topic/:currentPage" />
      </Router>
    </div>
  );
}

export default App;
