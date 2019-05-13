import React, { useState, useEffect } from "react";
import fetchTopics from "../queries/fetchTopics";

const TopicList = () => {
  const [state, setState] = useState({ topics: null });

  useEffect(() => {
    const fetchData = async () => {
      const topics = await fetchTopics();

      setState(topics);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>All Topics</h2>
      {state.topics ? (
        <ul>
          {state.topics.map(topic => (
            <li key={topic.slug}>
              {topic.slug} - {topic.description}
            </li>
          ))}
        </ul>
      ) : (
        "Loading topics..."
      )}
    </div>
  );
};

export default TopicList;
