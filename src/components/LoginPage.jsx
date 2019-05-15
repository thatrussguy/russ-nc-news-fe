import React, { useState, useEffect } from "react";
import { FormGroup, InputGroup, Button } from "@blueprintjs/core";
import { navigate } from "@reach/router";

import fetchUsernames from "../queries/fetchUsernames";

const LoginPage = ({ loggedInUser, setLoggedInUser }) => {
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
      navigate("/");
    } else {
      setHelperText("Invalid username");
    }
  };

  const handleChange = ({ target: { value } }) => {
    setUsernameInput(value);
  };

  return (
    usernames && (
      <div className="login-form">
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
      </div>
    )
  );
};

export default LoginPage;
