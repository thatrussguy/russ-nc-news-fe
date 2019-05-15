import React, { useState, useEffect } from "react";
import { Button, Card } from "@blueprintjs/core";

import fetchArticle from "../queries/fetchArticle";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const ArticlePage = ({ article_id, loggedInUser }) => {
  const [article, setArticle] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const article = await fetchArticle(article_id);
      setArticle(article);
    };
    fetchData();
  }, [article_id]);

  const { title, body, author } = article ? article : {};

  return (
    article && (
      <div>
        <Card interactive={true} className="article" key={article_id}>
          <h2>
            {title} ({author})
          </h2>
          <p>{body}</p>
          <Button
            disabled={!loggedInUser}
            onClick={() => setShowCommentForm(true)}
          >
            {loggedInUser ? "Add a comment" : "Login to add a comment"}
          </Button>
        </Card>
        {showCommentForm && (
          <CommentForm article_id={article_id} loggedInUser={loggedInUser} />
        )}
        <CommentList article_id={article_id} />
      </div>
    )
  );
};

export default ArticlePage;
