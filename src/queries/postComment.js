import Axios from "axios";
import backEndApiUrl from "../config/urls";

const postComment = (article_id, username, body) => {
  return Axios.post(`${backEndApiUrl}/articles/${article_id}/comments`, {
    username,
    body
  }).then(({ data: { comment } }) => comment);
};

export default postComment;
