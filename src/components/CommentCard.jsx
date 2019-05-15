import React, { useState } from "react";
import { Card, Button } from "@blueprintjs/core";

import deleteComment from "../queries/deleteComment";
import voteOnComment from "../queries/voteOnComment";

const CommentCard = ({
  comment: { comment_id, body, author, votes },
  loggedInUser,
  comments,
  setComments
}) => {
  const [myVote, setMyVote] = useState(0);

  const handleDeleteClick = comment_id => {
    deleteComment(comment_id);
    setComments(comments.filter(comment => comment.comment_id !== comment_id));
  };
  const handleVoteClick = increment => {
    setMyVote(myVote + increment);
    voteOnComment(comment_id, increment);
  };

  return (
    <Card interactive={true} className="comment-list" key={comment_id}>
      <h5>{body}</h5>
      <p>
        Written by {author} - {votes + myVote} votes
      </p>
      {loggedInUser === author && (
        <Button onClick={() => handleDeleteClick(comment_id)}>Delete</Button>
      )}
      <Button
        icon="thumbs-up"
        className="vote-button"
        disabled={!loggedInUser || myVote === 1}
        onClick={() => handleVoteClick(1)}
      />
      <Button
        icon="thumbs-down"
        className="vote-button"
        disabled={!loggedInUser || myVote === -1}
        onClick={() => handleVoteClick(-1)}
      />
    </Card>
  );
};

export default CommentCard;
