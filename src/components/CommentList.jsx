import React, { useEffect } from "react";
import { Card, Button } from "@blueprintjs/core";

import fetchComments from "../queries/fetchComments";
import deleteComment from "../queries/deleteComment";

const CommentList = ({ article_id, comments, setComments, loggedInUser }) => {
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const comments = await fetchComments(article_id);
      mounted && setComments(comments ? comments : []);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, [article_id, setComments, comments]);

  const handleClick = comment_id => {
    deleteComment(comment_id);
  };

  return (
    comments && (
      <div>
        {comments.map(({ comment_id, author, body }) => (
          <Card interactive={true} className="comment-list" key={comment_id}>
            <h5>{body}</h5>
            <p>written by {author}</p>
            {loggedInUser === author && (
              <Button onClick={() => handleClick(comment_id)}>Delete</Button>
            )}
          </Card>
        ))}
      </div>
    )
  );
};

export default CommentList;
