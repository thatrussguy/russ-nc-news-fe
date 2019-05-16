import axios from "axios";

import { backEndApiUrl } from "../config/urls";

const fetchComments = (articleId, params) => {
  return axios
    .get(`${backEndApiUrl}/articles/${articleId}/comments`, { params })
    .then(({ data: { comments } }) => comments);
};

export default fetchComments;
