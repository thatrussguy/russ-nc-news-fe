import React from "react";
import { Link } from "@reach/router";

const NavigationBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/topics">Topics</Link>
    </nav>
  );
};

export default NavigationBar;
