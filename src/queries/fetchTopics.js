import backEndApiUrl from "../config/urls";

const fetchTopics = () => {
  return fetch(`${backEndApiUrl}/topics`).then(response => response.json());
};

export default fetchTopics;
