import React, { useState } from "react";
import { Card, TextArea, Button } from "@blueprintjs/core";

import postComment from "../queries/postComment";

const CommentForm = ({
  article_id,
  loggedInUser,
  setShowCommentForm,
  setComments,
  comments
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
          growVertically={true}
          large={true}
          fill={true}
          onChange={handleChange}
          autoFocus
        />
        <Button
          type="submit"
          className="comment-button"
          disabled={!commentInput}
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