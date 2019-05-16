import Axios from "axios";

import { backEndApiUrl } from "../config/urls";

const fetchArticle = article_id => {
  return Axios.get(`${backEndApiUrl}/articles/${article_id}`).then(
    ({ data: { article } }) => article
  );
};

export default fetchArticle;
