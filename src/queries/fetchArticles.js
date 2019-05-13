import backEndApiUrl from "../config/urls";

const fetchArticles = topic => {
  return fetch(`${backEndApiUrl}/articles?topic=${topic}`).then(response =>
    response.json()
  );
};

export default fetchArticles;
