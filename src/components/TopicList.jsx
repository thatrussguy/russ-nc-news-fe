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
        {topics.map(({ slug, description }) => (
          <Card interactive={true} className="topic-list" key={slug}>
            <h5>{slug}</h5>
            <p>{description}</p>
            <Link to={`/topics/${slug}`}>
              <Button>{slug} articles</Button>
            </Link>
          </Card>
        ))}
      </div>
    )
  );
};

export default TopicList;
