import React from "react";
import { Link } from "@reach/router";

const NavigationBar = ({ loggedInUser }) => {
  console.log(loggedInUser);
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/topics">Topics</Link> |{" "}
      {loggedInUser ? (
        <Link to="/logout">Log Out</Link>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </nav>
  );
};

export default NavigationBar;
