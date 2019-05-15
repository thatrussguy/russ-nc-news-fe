import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Button, Card } from "@blueprintjs/core";
import moment from "moment";

import fetchArticles from "../queries/fetchArticles";

const ArticleList = ({ topic }) => {
  const [articles, setArticles] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const articles = await fetchArticles({
        topic,
        sort_by: sortBy,
        order: sortOrder
      });
      mounted && setArticles(articles ? articles : []);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, [topic, sortBy, sortOrder]);

  const handleClick = sortKey => {
    setSortBy(sortKey);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    articles && (
      <div>
        <Card interactive={true} className="article-list">
          <h4>
            Sort by:{" "}
            <Button
              className="sort-button"
              icon="numbered-list"
              onClick={() => handleClick("votes")}
            >
              <span className="button-text">Votes</span>
            </Button>
            <Button
              className="sort-button"
              icon="chat"
              onClick={() => handleClick("comment_count")}
            >
              <span className="button-text">Comments</span>
            </Button>
            <Button
              className="sort-button"
              icon="calendar"
              onClick={() => handleClick("created_at")}
            >
              <span className="button-text">Date</span>
            </Button>
          </h4>
        </Card>
        {articles.map(
          ({ title, author, article_id, created_at, votes, comment_count }) => (
            <Card interactive={true} className="article-list" key={article_id}>
              <h3>
                {title} (score: {votes}, comments: {comment_count})
              </h3>
              <p>
                Written by {author} on{" "}
                {moment(created_at).format("MMMM Do YYYY [at] h:mm a")}
              </p>
              <Link to={`/articles/${article_id}`}>
                <Button>Read</Button>
              </Link>
            </Card>
          )
        )}
      </div>
    )
  );
};

export default ArticleList;
