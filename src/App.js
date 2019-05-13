import React from "react";
import "./App.css";

import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import ArticleList from "./components/ArticleList";

function App() {
  return (
    <div className="App">
      <Header />
      <NavigationBar />
      <ArticleList />
    </div>
  );
}

export default App;
