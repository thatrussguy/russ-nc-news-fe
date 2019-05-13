import React from "react";
import { Router } from "@reach/router";
import AllTopics from "../components/AllTopics";
import OneTopic from "../components/OneTopic";

const TopicList = () => {
  return (
    <Router>
      <AllTopics path="/" />
      <OneTopic path="/:topic" />
    </Router>
  );
};

export default TopicList;
