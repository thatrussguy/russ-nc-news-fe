import React, { useEffect, useState } from "react";
import { Button, Card } from "@blueprintjs/core";
import { Link } from "@reach/router";

import TopicForm from "./TopicForm";

import fetchTopics from "../queries/fetchTopics";

const TopicList = ({ loggedInUser }) => {
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const topics = await fetchTopics();
      mounted && setTopics(topics ? topics : []);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    topics && (
      <div>
        <h1 className="topic-list">All Topics</h1>
        <Button
          className="topic"
          disabled={!loggedInUser}
          onClick={() => setShowTopicForm(true)}
          text={
            loggedInUser ? "Create a new topic" : "Login to create a new topic"
          }
        />
        {showTopicForm && (
          <TopicForm
            loggedInUser={loggedInUser}
            topics={topics}
            setTopics={setTopics}
            setShowTopicForm={setShowTopicForm}
          />
        )}
        {topics.map(({ slug, description }) => (
          <Card interactive={true} className="topic-list" key={slug}>
            <h2 className="capitalize">{slug}</h2>
            <p>{description}</p>
            <Link to={`/topics/${slug}`}>
              <Button className="capitalize">{slug} articles</Button>
            </Link>
          </Card>
        ))}
      </div>
    )
  );
};

export default TopicList;
