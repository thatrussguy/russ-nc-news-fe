import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Button, Card, Spinner } from "@blueprintjs/core";
import moment from "moment";

import ArticleForm from "./ArticleForm";

import fetchArticles from "../queries/fetchArticles";

const ArticleList = ({ topic, loggedInUser }) => {
  const [articles, setArticles] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [showArticleForm, setShowArticleForm] = useState(false);

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
    <div>
      <h1 className="article-list capitalize">
        {topic ? topic : "All"} articles
      </h1>
      <Button
        disabled={!loggedInUser}
        className="article"
        text={loggedInUser ? "Write an article" : "Login to write an article"}
        onClick={() => setShowArticleForm(true)}
      />
      {showArticleForm && (
        <ArticleForm
          loggedInUser={loggedInUser}
          setShowArticleForm={setShowArticleForm}
          articles={articles}
          setArticles={setArticles}
          topic={topic}
        />
      )}
      <h4 className="article-list">
        Sort by:{" "}
        <Button
          className="sort-button"
          icon="heart"
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
      {articles ? (
        articles.map(
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
        )
      ) : (
        <Spinner className="article-list" />
      )}
    </div>
  );
};

export default ArticleList;
