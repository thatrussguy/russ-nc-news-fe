import backEndApiUrl from "../config/urls";

const fetchArticles = () => {
  return fetch(`${backEndApiUrl}/articles`).then(response => response.json());
};

export default fetchArticles;
