import { backEndApiUrl } from "../config/urls";
import Axios from "axios";

const fetchArticle = article_id => {
  return Axios.get(`${backEndApiUrl}/articles/${article_id}`).then(
    ({ data: { article } }) => article
  );
};

export default fetchArticle;
