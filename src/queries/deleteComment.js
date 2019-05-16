import Axios from "axios";

import { backEndApiUrl } from "../config/urls";

const deleteComment = comment_id => {
  return Axios.delete(`${backEndApiUrl}/comments/${comment_id}`);
};

export default deleteComment;
