import React, { useEffect } from "react";
import { Spinner } from "@blueprintjs/core";

import CommentCard from "./CommentCard";

import fetchComments from "../queries/fetchComments";

const CommentList = ({ article_id, comments, setComments, loggedInUser }) => {
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const comments = await fetchComments(article_id);
      mounted && setComments(comments);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, [article_id, setComments]);

  return (
    <div>
      <h2 className="comment-list">Comments</h2>
      {comments ? (
        comments.map(comment => (
          <CommentCard
            comment={comment}
            key={comment.comment_id}
            loggedInUser={loggedInUser}
            comments={comments}
            setComments={setComments}
          />
        ))
      ) : (
        <Spinner className="comment-list" />
      )}
    </div>
  );
};

export default CommentList;
