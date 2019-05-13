import backEndApiUrl from "../config/urls";

const fetchArticle = article_id => {
  return fetch(`${backEndApiUrl}/articles/${article_id}`).then(response =>
    response.json()
  );
};

export default fetchArticle;
