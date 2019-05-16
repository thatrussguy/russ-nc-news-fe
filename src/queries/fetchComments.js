import backEndApiUrl from "../config/urls";
import axios from "axios";

const fetchComments = (articleId, params) => {
  return axios
    .get(`${backEndApiUrl}/articles/${articleId}/comments`, { params })
    .then(({ data: { comments } }) => comments);
};

export default fetchComments;
