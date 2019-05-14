import backEndApiUrl from "../config/urls";
import axios from "axios";

const fetchComments = articleId => {
  return axios
    .get(`${backEndApiUrl}/articles/${articleId}/comments`)
    .then(({ data: { comments } }) => comments);
};

export default fetchComments;
