import React, { useState } from "react";
import { FormGroup, InputGroup, Button } from "@blueprintjs/core";
import { navigate } from "@reach/router";

const LoginPage = ({ loggedInUser, setLoggedInUser }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    setLoggedInUser(usernameInput);
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => {
    setUsernameInput(value);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <FormGroup
          helperText="You can log in as 'guest'..."
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
  );
};

export default LoginPage;
