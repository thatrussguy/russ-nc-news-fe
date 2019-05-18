import moment from "moment";
import React, { useState } from "react";
import { Button, Card } from "@blueprintjs/core";
import { Link } from "@reach/router";

import VoteButtons from "./VoteButtons";

import deleteComment from "../queries/deleteComment";
import voteOnComment from "../queries/voteOnComment";

const CommentCard = ({
  comment: { author, body, comment_id, created_at, votes },
  comments,
  loggedInUser,
  setComments
}) => {
  const [myVote, setMyVote] = useState(0);

  const handleDeleteClick = comment_id => {
    deleteComment(comment_id);
    setComments(comments.filter(comment => comment.comment_id !== comment_id));
  };
  const handleVoteClick = increment => {
    voteOnComment(comment_id, increment);
    setMyVote(myVote + increment);
  };

  return (
    <Card interactive={true} className="comment-list" key={comment_id}>
      <p className="comment-body">{body}</p>
      <p>
        Written by <Link to={`/authors/${author}`}>{author}</Link> on{" "}
        {moment(created_at).format("MMMM Do YYYY [at] h:mm a")} (score:{" "}
        {votes + myVote})
      </p>
      {loggedInUser === author && (
        <Button onClick={() => handleDeleteClick(comment_id)}>Delete</Button>
      )}
      <VoteButtons
        handleVoteClick={handleVoteClick}
        loggedInUser={loggedInUser}
        myVote={myVote}
      />
    </Card>
  );
};

export default CommentCard;
