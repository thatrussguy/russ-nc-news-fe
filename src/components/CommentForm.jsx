import React, { useState } from "react";
import { Button, Card, TextArea } from "@blueprintjs/core";

import postComment from "../queries/postComment";

const CommentForm = ({
  article_id,
  comments,
  loggedInUser,
  setComments,
  setShowCommentForm
}) => {
  const [commentInput, setCommentInput] = useState("");

  const handleChange = ({ target: { value } }) => setCommentInput(value);
  const handleSubmit = event => {
    event.preventDefault();
    postComment(article_id, loggedInUser, commentInput).then(comment =>
      setComments([comment, ...comments])
    );

    setShowCommentForm(false);
  };

  return (
    <Card className="comment-form">
      <form onSubmit={handleSubmit}>
        <TextArea
          autoFocus
          fill={true}
          growVertically={true}
          large={true}
          onChange={handleChange}
        />
        <Button
          className="comment-button"
          disabled={!commentInput}
          type="submit"
        >
          Post Comment
        </Button>
        <Button
          className="comment-button"
          onClick={() => setShowCommentForm(false)}
        >
          Cancel
        </Button>
      </form>
    </Card>
  );
};

export default CommentForm;
