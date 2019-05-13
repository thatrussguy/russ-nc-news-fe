import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import fetchTopics from "../queries/fetchTopics";

const AllTopics = () => {
  const [state, setState] = useState({ topics: null });

  useEffect(() => {
    const fetchData = async () => {
      const topics = await fetchTopics();

      setState(topics);
    };
    fetchData();
  }, []);

  return (
    <div path="/">
      <h2>All Topics</h2>
      {state.topics ? (
        <ul>
          {state.topics.map(topic => (
            <li key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>
                {topic.slug} - {topic.description}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        "Loading topics..."
      )}
    </div>
  );
};

export default AllTopics;
