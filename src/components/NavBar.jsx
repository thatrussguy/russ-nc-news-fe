import React from "react";
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { Link } from "@reach/router";

import { githubUrl } from "../config/urls";

const NavBar = ({ loggedInUser, setLoggedInUser, setShowLoginForm }) => {
  return (
    <Navbar role="navigation">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <a
            className="github-link"
            href={githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            NC<span className="button-text"> </span>N
            <span className="button-text">ews</span>
          </a>
        </Navbar.Heading>

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
          <span>
            <Button
              className="bp3-minimal"
              icon="log-out"
              onClick={e => {
                e.preventDefault();
                setLoggedInUser(null);
                localStorage.removeItem("loggedInUser");
              }}
            >
              <span className="button-text">Logout</span>
            </Button>
            <Link to={`/${loggedInUser}/articles`}>
              <Button className="bp3-minimal" icon="person">
                <span className="button-text">{loggedInUser}</span>
              </Button>
            </Link>
          </span>
        ) : (
          <Button
            className="bp3-minimal"
            icon="log-in"
            onClick={() => setShowLoginForm(true)}
            text="Login"
          />
        )}
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
