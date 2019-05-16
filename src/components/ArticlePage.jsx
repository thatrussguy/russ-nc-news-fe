import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "@blueprintjs/core";
import { Link } from "@reach/router";

import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import ErrorCard from "../components/ErrorCard";
import VoteButtons from "../components/VoteButtons";

import fetchArticle from "../queries/fetchArticle";
import voteOnArticle from "../queries/voteOnArticle";

const ArticlePage = ({ article_id, loggedInUser }) => {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [myVote, setMyVote] = useState(0);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const article = await fetchArticle(article_id).catch(
        ({
          response: {
            data: { message },
            status
          }
        }) => setError({ message, status })
      );
      setArticle(article);
    };
    fetchData();
  }, [article_id]);

  const handleVoteClick = increment => {
    setMyVote(myVote + increment);
    voteOnArticle(article_id, increment);
  };

  const { author, body, comment_count, created_at, title, votes } = article
    ? article
    : {};

  return article ? (
    <div>
      <Card interactive={true} className="article" key={article_id}>
        <h2>{title}</h2>
        <h3>
          Written by <Link to={`/${author}/articles`}>{author}</Link> on{" "}
          {moment(created_at).format("MMMM Do YYYY [at] h:mm a")} (
          {votes + myVote} votes)
        </h3>
        <p>{body}</p>
        <Button
          disabled={!loggedInUser}
          onClick={() => setShowCommentForm(true)}
        >
          {loggedInUser ? "Add a comment" : "Login to add a comment"}
        </Button>
        <VoteButtons
          handleVoteClick={handleVoteClick}
          loggedInUser={loggedInUser}
          myVote={myVote}
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
        totalCount={Number(comment_count)}
      />
    </div>
  ) : error ? (
    <ErrorCard error={error} />
  ) : (
    <Spinner className="article" />
  );
};

export default ArticlePage;
