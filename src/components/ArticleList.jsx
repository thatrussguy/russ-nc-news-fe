import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Button, Card } from "@blueprintjs/core";

import fetchArticles from "../queries/fetchArticles";

const ArticleList = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await fetchArticles();
      setArticles(articles ? articles : []);
    };
    fetchData();
  }, []);

  return (
    articles && (
      <div>
        {articles.map(({ title, author, article_id }) => (
          <Card interactive={true} className="article-list" key={article_id}>
            <h5>{title}</h5>
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
