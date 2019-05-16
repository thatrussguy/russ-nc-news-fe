import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Button, Card, Spinner } from "@blueprintjs/core";
import moment from "moment";

import ArticleForm from "./ArticleForm";
import PaginationFooter from "./PaginationFooter";
import ErrorCard from "../components/ErrorCard";

import fetchArticles from "../queries/fetchArticles";
import deleteArticle from "../queries/deleteArticle";

const ArticleList = ({ topic, loggedInUser, author }) => {
  console.log();

  const [articles, setArticles] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const response = await fetchArticles({
        topic,
        sort_by: sortBy,
        order: sortOrder,
        p: page,
        author
      }).catch(({ response: { data: { message }, status } }) =>
        setError({ status, message })
      );
      let articles, total_count;
      if (response) ({ articles, total_count } = response);
      mounted && setArticles(articles);
      mounted && setTotalCount(total_count);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, [topic, sortBy, sortOrder, page, author]);

  const handleClick = sortKey => {
    setSortBy(sortKey);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleDeleteClick = article_id => {
    deleteArticle(article_id);
    setArticles(articles.filter(article => article.article_id !== article_id));
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
                Written by <Link to={`/${author}/articles`}>{author}</Link> on{" "}
                {moment(created_at).format("MMMM Do YYYY [at] h:mm a")}
              </p>
              {loggedInUser === author && (
                <Button
                  onClick={() => handleDeleteClick(article_id)}
                  className="article-button"
                >
                  Delete
                </Button>
              )}
              <Link to={`/articles/${article_id}`}>
                <Button className="article-button">Read</Button>
              </Link>
            </Card>
          )
        )
      ) : error ? (
        <ErrorCard error={error} />
      ) : (
        <Spinner className="article" />
      )}
      {totalCount ? (
        <PaginationFooter
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(totalCount / 10)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ArticleList;
