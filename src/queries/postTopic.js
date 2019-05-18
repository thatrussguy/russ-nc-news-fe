import Axios from "axios";

import { backEndApiUrl } from "../config/urls";

const postTopic = (slug, description) => {
  return Axios.post(`${backEndApiUrl}/topics`, {
    description,
    slug
  }).then(({ data: { topic } }) => topic);
};

export default postTopic;
