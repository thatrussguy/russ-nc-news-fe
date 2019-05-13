import React, { useState, useEffect } from "react";
import fetchArticles from "../queries/fetchArticles";

const ArticleList = () => {
  const [state, setState] = useState({ articles: null });

  useEffect(() => {
    const fetchData = async () => {
      const articles = await fetchArticles();

      setState(articles);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Latest Articles</h2>
      {state.articles ? (
        <ul>
          {state.articles.map(article => (
            <li key={article.article_id}>{article.title}</li>
          ))}
        </ul>
      ) : (
        "Loading articles..."
      )}
    </div>
  );
};

export default ArticleList;
