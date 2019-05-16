import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@blueprintjs/core";

import ArticleCard from "./ArticleCard";
import ArticleForm from "./ArticleForm";
import ErrorCard from "../components/ErrorCard";
import PaginationFooter from "./PaginationFooter";

import fetchArticles from "../queries/fetchArticles";
import deleteArticle from "../queries/deleteArticle";

const ArticleList = ({ author, loggedInUser, topic }) => {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const response = await fetchArticles({
        author,
        order: sortOrder,
        p: page,
        sort_by: sortBy,
        topic
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

  const handleDeleteClick = article_id => {
    deleteArticle(article_id);
    setArticles(articles.filter(article => article.article_id !== article_id));
  };
  const handleSortClick = sortKey => {
    setSortBy(sortKey);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div>
      <h1 className="article-list capitalize">
        {topic ? topic : author ? `${author}'s` : "All"} articles
      </h1>
      <Button
        className="article"
        disabled={!loggedInUser}
        onClick={() => setShowArticleForm(true)}
        text={loggedInUser ? "Write an article" : "Login to write an article"}
      />
      {showArticleForm && (
        <ArticleForm
          articles={articles}
          loggedInUser={loggedInUser}
          setArticles={setArticles}
          setShowArticleForm={setShowArticleForm}
          topic={topic}
        />
      )}
      <h4 className="article-list">
        Sort by:{" "}
        <Button
          className="sort-button bp3-minimal"
          icon="heart"
          onClick={() => handleSortClick("votes")}
        >
          <span className="button-text">Votes</span>
        </Button>
        <Button
          className="sort-button bp3-minimal"
          icon="chat"
          onClick={() => handleSortClick("comment_count")}
        >
          <span className="button-text">Comments</span>
        </Button>
        <Button
          className="sort-button bp3-minimal"
          icon="calendar"
          onClick={() => handleSortClick("created_at")}
        >
          <span className="button-text">Date</span>
        </Button>
      </h4>
      {articles ? (
        articles.map(article => (
          <ArticleCard
            article={article}
            handleDeleteClick={handleDeleteClick}
            loggedInUser={loggedInUser}
          />
        ))
      ) : error ? (
        <ErrorCard error={error} />
      ) : (
        <Spinner className="article" />
      )}
      {totalCount && (
        <PaginationFooter
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(totalCount / 10)}
        />
      )}
    </div>
  );
};

export default ArticleList;
