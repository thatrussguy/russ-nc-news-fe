import React, { useState, useEffect } from "react";
import fetchArticle from "../../queries/fetchArticle";
import fetchComments from "../../queries/fetchComments";

const Article = ({ article_id }) => {
  const [state, setState] = useState({ article: null, comments: null });

  useEffect(() => {
    const fetchData = async () => {
      const { article, message } = await fetchArticle(article_id);
      let comments = null;
      if (article && article.comment_count) {
        comments = await fetchComments(article_id);
      }
      setState({ article, comments, message });
    };
    fetchData();
  }, [article_id]);
  return (
    <div>
      {state.article ? (
        <div>
          <h2>{state.article.title}</h2>
          <div>{state.article.body}</div>
          {state.comments ? (
            <div>
              <h3>Comments</h3>
              <ul>
                {state.comments.map(comment => (
                  <li key={comment.comment_id}>
                    {comment.author}: {comment.body}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h3>No comments</h3>
          )}
        </div>
      ) : state.message ? (
        "No such article"
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Article;
