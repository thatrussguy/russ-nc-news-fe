import React, { useState, useEffect } from "react";
import { Button, Card } from "@blueprintjs/core";

import fetchArticle from "../queries/fetchArticle";
import CommentList from "../components/CommentList";

const ArticlePage = ({ article_id }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const article = await fetchArticle(article_id);
      setArticle(article);
    };
    fetchData();
  }, [article_id]);

  const { title, body, author } = article ? article : {};

  return (
    article && (
      <div>
        <Card interactive={true} className="article" key={article_id}>
          <h2>
            {title} ({author})
          </h2>
          <p>{body}</p>
          <Button>Add a comment</Button>
        </Card>
        <CommentList article_id={article_id} />
      </div>
    )
  );
};

export default ArticlePage;
