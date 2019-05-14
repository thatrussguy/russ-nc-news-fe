import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import fetchTopics from "../../queries/fetchTopics";

const AllTopics = () => {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const topics = await fetchTopics();

      setTopics(topics);
    };
    fetchData();
  }, []);

  return (
    <div path="/">
      <h2>All Topics</h2>
      {topics ? (
        <ul>
          {topics.map(({ slug, description }) => (
            <li key={slug}>
              <Link to={`/topics/${slug}`}>
                {slug} - {description}
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
