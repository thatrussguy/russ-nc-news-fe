import React, { useEffect, useState } from "react";
import { Button, Card, FormGroup, InputGroup } from "@blueprintjs/core";

import fetchUsernames from "../queries/fetchUsernames";

const LoginPage = ({ loggedInUser, setLoggedInUser, setShowLoginForm }) => {
  const [helperText, setHelperText] = useState("You can log in as 'guest'...");
  const [usernameInput, setUsernameInput] = useState("");
  const [usernames, setUsernames] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const usernames = await fetchUsernames();
      mounted && setUsernames(usernames);
    };
    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    if (usernames.includes(usernameInput)) {
      setLoggedInUser(usernameInput);
      setShowLoginForm(false);
    } else {
      setHelperText(
        "Invalid username. Use 'guest' if you don't have an account"
      );
    }
  };

  const handleChange = ({ target: { value } }) => {
    setUsernameInput(value.toLowerCase());
  };

  return (
    usernames && (
      <Card className="login-form">
        <form onSubmit={handleSubmit}>
          <FormGroup
            disabled={loggedInUser ? true : false}
            helperText={helperText}
            label="Username"
            labelFor="username-input"
            labelInfo="(required)"
          >
            <InputGroup
              autoFocus
              disabled={loggedInUser ? true : false}
              id="username-input"
              onChange={handleChange}
              placeholder="Enter your username"
            />
            <Button
              className="login-button"
              disabled={loggedInUser ? true : false}
              type="submit"
            >
              Log in
            </Button>
            <Button
              className="login-button"
              onClick={() => setShowLoginForm(false)}
            >
              Cancel
            </Button>
          </FormGroup>
        </form>
      </Card>
    )
  );
};

export default LoginPage;
