import backEndApiUrl from "../config/urls";
import axios from "axios";

const fetchArticles = params => {
  return axios
    .get(`${backEndApiUrl}/articles`, { params })
    .then(({ data }) => data);
};

export default fetchArticles;
