import { backEndApiUrl } from "../config/urls";
import axios from "axios";

const fetchArticles = params => {
  return axios
    .get(`${backEndApiUrl}/articles`, { params })
    .then(({ data: { articles, total_count } }) => ({ articles, total_count }));
};

export default fetchArticles;
