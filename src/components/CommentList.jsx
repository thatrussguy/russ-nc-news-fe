import React, { useState, useEffect } from "react";
import { Card } from "@blueprintjs/core";

import fetchComments from "../queries/fetchComments";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const comments = await fetchComments(article_id);
      setComments(comments ? comments : []);
    };
    fetchData();
  }, [article_id]);

  return (
    comments && (
      <div>
        {comments.map(({ comment_id, author, body }) => (
          <Card interactive={true} className="comment-list" key={comment_id}>
            <h5>{body}</h5>
            <p>written by {author}</p>
          </Card>
        ))}
      </div>
    )
  );
};

export default CommentList;
