import moment from "moment";
import React from "react";
import { Button, Card } from "@blueprintjs/core";
import { Link } from "@reach/router";

const ArticleCard = ({
  article: { article_id, author, comment_count, created_at, title, votes },
  handleDeleteClick,
  loggedInUser
}) => {
  return (
    <Card interactive={true} className="article-list" key={article_id}>
      <p className="article-title" data-cy="article-title-text">
        {title}
      </p>
      <p>
        Written by <Link to={`/authors/${author}`}>{author}</Link> on{" "}
        {moment(created_at).format("MMMM Do YYYY [at] h:mm a")}
      </p>
      <p>
        Votes: {votes} Comments: {comment_count}
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
  );
};

export default ArticleCard;
