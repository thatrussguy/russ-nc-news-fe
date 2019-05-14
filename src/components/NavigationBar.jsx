import React from "react";
import { Link } from "@reach/router";

const NavigationBar = ({ loggedInUser, setLoggedInUser }) => {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/topics">Topics</Link> |{" "}
      {loggedInUser ? (
        <Link
          to="/logout"
          onClick={e => {
            e.preventDefault();
            setLoggedInUser(null);
          }}
        >
          Log Out ({loggedInUser})
        </Link>
      ) : (
        <Link
          to="/login"
          onClick={e => {
            e.preventDefault();
            setLoggedInUser("Guest");
          }}
        >
          Log In
        </Link>
      )}
    </nav>
  );
};

export default NavigationBar;
