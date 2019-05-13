import React from "react";
import "./App.css";

import ArticleList from "./components/ArticleList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NC News</h1>
      </header>
      <ArticleList />
    </div>
  );
}

export default App;
