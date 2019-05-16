import React, { useState, useEffect } from "react";
import { Card, TextArea, Button, Spinner } from "@blueprintjs/core";

import postArticle from "../queries/postArticle";
import fetchTopics from "../queries/fetchTopics";

const ArticleForm = ({
  loggedInUser,
  setShowArticleForm,
  setArticles,
  articles,
  topic
}) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [topics, setTopics] = useState(null);
  const [chosenTopic, setChosenTopic] = useState(topic || null);

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
          className="article-input bp3-input capitalize"
          defaultValue={topic ? topic : ""}
          onChange={({ target: { value } }) => setChosenTopic(value)}
        >
          {topics.map(({ slug }) => (
            <option key={slug}>{slug}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Title"
          onChange={({ target: { value } }) => setTitleInput(value)}
          autoFocus
          className="article-input bp3-input"
        />
        <TextArea
          growVertically={true}
          large={true}
          fill={true}
          onChange={({ target: { value } }) => setBodyInput(value)}
          placeholder="Write your article here"
          className="article-input"
        />
        <Button
          type="submit"
          className="article-button"
          disabled={!titleInput || !bodyInput}
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
