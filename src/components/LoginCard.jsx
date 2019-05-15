import React, { useState, useEffect } from "react";
import { FormGroup, InputGroup, Button, Card } from "@blueprintjs/core";

import fetchUsernames from "../queries/fetchUsernames";

const LoginPage = ({ loggedInUser, setLoggedInUser, setShowLoginForm }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [usernames, setUsernames] = useState(null);
  const [helperText, setHelperText] = useState("You can log in as 'guest'...");

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
            helperText={helperText}
            label="Username"
            labelFor="username-input"
            labelInfo="(required)"
            disabled={loggedInUser ? true : false}
          >
            <InputGroup
              id="username-input"
              placeholder="Enter your username"
              disabled={loggedInUser ? true : false}
              onChange={handleChange}
            />
            <Button
              className="login-button"
              type="submit"
              disabled={loggedInUser ? true : false}
            >
              Log in
            </Button>
          </FormGroup>
        </form>
        {loggedInUser && <p>You are already logged in as {loggedInUser}</p>}
      </Card>
    )
  );
};

export default LoginPage;
