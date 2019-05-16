import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Button, Card } from "@blueprintjs/core";

import fetchTopics from "../queries/fetchTopics";

const TopicList = () => {
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
