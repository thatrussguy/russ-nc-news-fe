import React, { useState } from "react";
import { Button, Card, FormGroup, TextArea } from "@blueprintjs/core";

import postTopic from "../queries/postTopic";

const TopicForm = ({ loggedInUser, setTopics, setShowTopicForm, topics }) => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [helperText, setHelperText] = useState("");
  const [slugInput, setSlugInput] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (!topics.map(topic => topic.slug).includes(slugInput)) {
      postTopic(slugInput, descriptionInput);
      setTopics([
        { slug: slugInput, description: descriptionInput },
        ...topics
      ]);
      setShowTopicForm(false);
    } else setHelperText(`${slugInput} is already a topic`);
  };

  return (
    <Card className="topic-form">
      <form onSubmit={handleSubmit}>
        <FormGroup
          disabled={loggedInUser ? true : false}
          helperText={helperText}
        >
          <input
            aria-label="slug"
            autoFocus
            className="topic-input bp3-input"
            onChange={({ target: { value } }) =>
              setSlugInput(value.toLowerCase())
            }
            placeholder="Topic name"
            type="text"
          />
          <TextArea
            aria-label="description"
            className="topic-input"
            fill={true}
            growVertically={true}
            large={true}
            onChange={({ target: { value } }) => setDescriptionInput(value)}
            placeholder="Write a description here"
          />
          <Button
            className="topic-button"
            disabled={!slugInput || !descriptionInput || !loggedInUser}
            type="submit"
          >
            Create Topic
          </Button>
          <Button
            className="topic-button"
            onClick={() => setShowTopicForm(false)}
          >
            Cancel
          </Button>
        </FormGroup>
      </form>
    </Card>
  );
};

export default TopicForm;
