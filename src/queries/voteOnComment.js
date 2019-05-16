import Axios from "axios";

import { backEndApiUrl } from "../config/urls";

const voteOnComment = (comment_id, inc_votes) => {
  return Axios.patch(`${backEndApiUrl}/comments/${comment_id}`, {
    inc_votes
  });
};

export default voteOnComment;
