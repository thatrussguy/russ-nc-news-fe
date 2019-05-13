import backEndApiUrl from "../config/urls";

const fetchArticles = (topic, page = 1) => {
  return fetch(`${backEndApiUrl}/articles?topic=${topic}&p=${page}`).then(
    response => response.json()
  );
};

export default fetchArticles;
