import React, { useState, useEffect } from "react";
import { Link, Router } from "@reach/router";

import PaginationFooter from "../components/PaginationFooter";

import fetchArticles from "../queries/fetchArticles";

const ArticleList = ({ topic = null, currentPage = 1 }) => {
  const [state, setState] = useState({
    articles: null,
    currentPage: 1,
    sort_by: null
  });
  const [sort, setSort] = useState({ sort_by: null, order: "desc" });

  useEffect(() => {
    const fetchData = async () => {
      const { articles, total_count } = await fetchArticles({
        topic,
        p: currentPage,
        sort_by: sort.sort_by,
        order: sort.order
      });
      setState(
        articles.message
          ? { articles: [], currentPage }
          : { articles, total_count, currentPage }
      );
    };
    fetchData();
  }, [currentPage, sort.order, sort.sort_by, topic]);

  const onClick = e => {
    console.log(e.target.id);
    e.preventDefault();
    setSort({
      sort_by: e.target.id,
      order: sort.order === "desc" ? "asc" : "desc"
    });
  };

  return (
    <div>
      <h2>Latest Articles</h2>
      {state.articles ? (
        state.articles.length ? (
          <div>
            <ul className="article-list">
              <li>
                <span>
                  <Link to="./" onClick={onClick} id="title">
                    Title
                  </Link>
                </span>
                <span>
                  <Link to="./" onClick={onClick} id="created_at">
                    Date
                  </Link>
                </span>
                <span>
                  <Link to="./" onClick={onClick} id="comment_count">
                    Comments
                  </Link>
                </span>
                <span>
                  <Link to="./" onClick={onClick} id="votes">
                    Votes
                  </Link>
                </span>
              </li>
              {state.articles.map(article => (
                <li key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    <span>{article.title}</span>
                  </Link>
                  <span>{article.created_at}</span>
                  <span>{article.comment_count}</span>
                  <span>{article.votes}</span>
                </li>
              ))}
            </ul>
            <Router>
              <PaginationFooter
                path="*"
                totalPages={Math.ceil(state.total_count / 10)}
                currentPage={currentPage}
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
