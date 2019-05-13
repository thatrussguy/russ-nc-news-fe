import React, { useState, useEffect } from "react";
import fetchArticle from "../queries/fetchArticle";

const Article = ({ article_id }) => {
  const [state, setState] = useState({ article: null });

  useEffect(() => {
    const fetchData = async () => {
      const article = await fetchArticle(article_id);
      setState(article);
    };
    fetchData();
  }, [article_id]);

  return (
    <div>
      {state.article ? (
        <div>
          <h2>{state.article.title}</h2>
          <div>{state.article.body}</div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Article;
