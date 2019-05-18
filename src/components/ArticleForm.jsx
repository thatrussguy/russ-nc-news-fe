import React, { useEffect, useState } from "react";
import { Button, Card, Spinner, TextArea } from "@blueprintjs/core";

import fetchTopics from "../queries/fetchTopics";
import postArticle from "../queries/postArticle";

const ArticleForm = ({
  loggedInUser,
  articles = [],
  setArticles,
  setShowArticleForm,
  topic
}) => {
  const [bodyInput, setBodyInput] = useState("");
  const [chosenTopic, setChosenTopic] = useState(topic || null);
  const [titleInput, setTitleInput] = useState("");
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const topics = await fetchTopics();
      mounted && setTopics(topics);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    postArticle(
      titleInput,
      bodyInput,
      chosenTopic || topics[0].slug,
      loggedInUser
    ).then(article => setArticles([article, ...articles]));
    setShowArticleForm(false);
  };

  return topics ? (
    <Card className="article-form">
      <form onSubmit={handleSubmit}>
        <select
          aria-label="topic"
          className="article-input bp3-input capitalize"
          defaultValue={topic ? topic : ""}
          onChange={({ target: { value } }) => setChosenTopic(value)}
        >
          {topics.map(({ slug }) => (
            <option key={slug}>{slug}</option>
          ))}
        </select>
        <input
          aria-label="title"
          autoFocus
          className="article-input bp3-input"
          data-cy="article-title-input"
          onChange={({ target: { value } }) => setTitleInput(value)}
          placeholder="Title"
          type="text"
        />
        <TextArea
          aria-label="body"
          className="article-input"
          data-cy="article-body-input"
          fill={true}
          growVertically={true}
          large={true}
          onChange={({ target: { value } }) => setBodyInput(value)}
          placeholder="Write your article here"
        />
        <Button
          className="article-button"
          data-cy="post-article-button"
          disabled={!titleInput || !bodyInput}
          type="submit"
        >
          Post Article
        </Button>
        <Button
          className="article-button"
          onClick={() => setShowArticleForm(false)}
        >
          Cancel
        </Button>
      </form>
    </Card>
  ) : (
    <Spinner />
  );
};

export default ArticleForm;
