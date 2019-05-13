import React, { useState, useEffect } from "react";
import { Link, Router } from "@reach/router";

import PaginationFooter from "../components/PaginationFooter";

import fetchArticles from "../queries/fetchArticles";

const ArticleList = ({ topic = "", currentPage = 1 }) => {
  const [state, setState] = useState({ articles: null, currentPage: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const { articles, total_count } = await fetchArticles(topic, currentPage);
      setState(
        articles.message
          ? { articles: [], currentPage }
          : { articles, total_count, currentPage }
      );
    };
    fetchData();
  }, [currentPage, topic]);

  return (
    <div>
      <h2>Latest Articles</h2>
      {state.articles ? (
        state.articles.length ? (
          <div>
            <ul>
              {state.articles.map(article => (
                <li key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Router>
              <PaginationFooter
                path="*"
                totalPages={Math.ceil(state.total_count / 10)}
              />
            </Router>
          </div>
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
