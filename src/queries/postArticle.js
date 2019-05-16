import Axios from "axios";
import { backEndApiUrl } from "../config/urls";

const postArticle = (title, body, topic, author) => {
  return Axios.post(`${backEndApiUrl}/articles`, {
    title,
    body,
    topic,
    author
  }).then(({ data: { article } }) => article);
};

export default postArticle;
