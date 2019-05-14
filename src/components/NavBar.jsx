import React from "react";
import { Navbar, Alignment, Button } from "@blueprintjs/core";
import { Link } from "@reach/router";

const NavBar = ({ loggedInUser, setLoggedInUser }) => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>NC News</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/">
          <Button className="bp3-minimal" icon="home" text="Home" />
        </Link>
        <Link to="/topics">
          <Button className="bp3-minimal" icon="folder-open" text="Topics" />
        </Link>
        {loggedInUser ? (
          <Button
            className="bp3-minimal"
            icon="log-out"
            text={`Logout (${loggedInUser})`}
            onClick={e => {
              e.preventDefault();
              setLoggedInUser(null);
            }}
          />
        ) : (
          <Button
            className="bp3-minimal"
            icon="log-in"
            text="Login"
            onClick={e => {
              e.preventDefault();
              setLoggedInUser("Guest");
            }}
          />
        )}
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
