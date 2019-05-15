import React, { useState, useEffect } from "react";
import { Button, Card } from "@blueprintjs/core";

import fetchArticle from "../queries/fetchArticle";
import voteOnArticle from "../queries/voteOnArticle";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const ArticlePage = ({ article_id, loggedInUser }) => {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [myVote, setMyVote] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const article = await fetchArticle(article_id);
      setArticle(article);
    };
    fetchData();
  }, [article_id]);

  const handleVoteClick = increment => {
    setMyVote(myVote + increment);
    voteOnArticle(article_id, increment);
  };

  const { title, body, author, votes } = article ? article : {};

  return (
    article && (
      <div>
        <Card interactive={true} className="article" key={article_id}>
          <h2>{title}</h2>
          <h3>
            Written by {author} - {votes + myVote} votes
          </h3>
          <p>{body}</p>
          <Button
            disabled={!loggedInUser}
            onClick={() => setShowCommentForm(true)}
          >
            {loggedInUser ? "Add a comment" : "Login to add a comment"}
          </Button>
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
        {showCommentForm && (
          <CommentForm
            article_id={article_id}
            loggedInUser={loggedInUser}
            setShowCommentForm={setShowCommentForm}
            comments={comments}
            setComments={setComments}
          />
        )}
        <CommentList
          article_id={article_id}
          comments={comments}
          setComments={setComments}
          loggedInUser={loggedInUser}
        />
      </div>
    )
  );
};

export default ArticlePage;
