import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Button, Card } from "@blueprintjs/core";

import fetchArticles from "../queries/fetchArticles";

const ArticleList = ({ topic }) => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const articles = await fetchArticles({ topic });
      mounted && setArticles(articles ? articles : []);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, [topic]);

  return (
    articles && (
      <div>
        {articles.map(({ title, author, article_id }) => (
          <Card interactive={true} className="article-list" key={article_id}>
            <h3>{title}</h3>
            <p>written by {author}</p>
            <Link to={`/articles/${article_id}`}>
              <Button>Read</Button>
            </Link>
          </Card>
        ))}
      </div>
    )
  );
};

export default ArticleList;
