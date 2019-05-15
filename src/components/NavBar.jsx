import React from "react";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import { Link } from "@reach/router";

const NavBar = ({ loggedInUser, setLoggedInUser, setShowLoginForm }) => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>NC News</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/">
          <Button className="bp3-minimal" icon="home">
            <span className="button-text">Home</span>
          </Button>
        </Link>
        <Link to="/topics">
          <Button className="bp3-minimal" icon="folder-open">
            <span className="button-text">Topics</span>
          </Button>
        </Link>
        {loggedInUser ? (
          <Button
            className="bp3-minimal"
            icon="log-out"
            onClick={e => {
              e.preventDefault();
              setLoggedInUser(null);
            }}
          >
            <span className="button-text">{`Logout (${loggedInUser})`}</span>
          </Button>
        ) : (
          <Button
            className="bp3-minimal"
            icon="log-in"
            text="Login"
            onClick={() => setShowLoginForm(true)}
          />
        )}
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
