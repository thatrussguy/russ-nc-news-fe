import Axios from "axios";
import { backEndApiUrl } from "../config/urls";

const deleteArticle = article_id => {
  return Axios.delete(`${backEndApiUrl}/articles/${article_id}`);
};

export default deleteArticle;
