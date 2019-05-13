import React from "react";
import { Router } from "@reach/router";
import AllTopics from "../components/AllTopics";

const TopicList = () => {
  return (
    <Router>
      <AllTopics path="/" />
    </Router>
  );
};

export default TopicList;
