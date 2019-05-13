import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import fetchArticles from "../queries/fetchArticles";

const ArticleList = ({ topic = "" }) => {
  const [state, setState] = useState({ articles: null });

  useEffect(() => {
    const fetchData = async () => {
      const articles = await fetchArticles(topic);
      setState(articles.message ? { articles: [] } : articles);
    };
    fetchData();
  }, [topic]);

  return (
    <div>
      <h2>Latest Articles</h2>
      {state.articles ? (
        state.articles.length ? (
          <ul>
            {state.articles.map(article => (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          "No Articles for this topic"
        )
      ) : (
        "Loading articles..."
      )}
    </div>
  );
};

export default ArticleList;
