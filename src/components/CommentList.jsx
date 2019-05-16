import React, { useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";

import CommentCard from "./CommentCard";

import fetchComments from "../queries/fetchComments";
import PaginationFooter from "./PaginationFooter";

const CommentList = ({
  article_id,
  comments,
  setComments,
  loggedInUser,
  totalCount
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const comments = await fetchComments(article_id, { p: page });
      mounted && setComments(comments);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, [article_id, setComments, page]);

  return (
    <div>
      <h2 className="comment-list">
        {totalCount ? "Comments" : "No comments yet"}
      </h2>
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
      {totalCount ? (
        <PaginationFooter
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(totalCount / 10)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentList;
