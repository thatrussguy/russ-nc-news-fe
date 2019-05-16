import { backEndApiUrl } from "../config/urls";

const fetchUsernames = () => {
  return fetch(`${backEndApiUrl}/users`)
    .then(response => response.json())
    .then(({ users }) => users.map(({ username }) => username));
};

export default fetchUsernames;
