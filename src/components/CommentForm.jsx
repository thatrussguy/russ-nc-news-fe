import React, { useState } from "react";
import { Button, Card, TextArea } from "@blueprintjs/core";

import postComment from "../queries/postComment";

const CommentForm = ({
  article_id,
  comments,
  loggedInUser,
  setComments,
  setShowCommentForm,
  setTotalCount,
  totalCount
}) => {
  const [commentInput, setCommentInput] = useState("");

  const handleChange = ({ target: { value } }) => setCommentInput(value);
  const handleSubmit = event => {
    event.preventDefault();
    postComment(article_id, loggedInUser, commentInput).then(comment => {
      setComments([comment, ...comments]);
      setTotalCount(totalCount + 1);
    });

    setShowCommentForm(false);
  };

  return (
    <Card className="comment-form">
      <form onSubmit={handleSubmit}>
        <TextArea
          autoFocus
          data-cy="comment-body-input"
          fill={true}
          growVertically={true}
          large={true}
          onChange={handleChange}
        />
        <Button
          className="comment-button"
          data-cy="post-comment-button"
          disabled={!commentInput || !loggedInUser}
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
