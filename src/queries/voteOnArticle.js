import Axios from "axios";

import { backEndApiUrl } from "../config/urls";

const voteOnArticle = (article_id, inc_votes) => {
  return Axios.patch(`${backEndApiUrl}/articles/${article_id}`, {
    inc_votes
  });
};

export default voteOnArticle;
