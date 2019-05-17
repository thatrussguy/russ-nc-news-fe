import React from "react";
import { Button } from "@blueprintjs/core";

const SortButtons = ({ handleSortClick }) => {
  return (
    <div className="article-list">
      Sort by:{" "}
      <Button
        className="sort-button bp3-minimal"
        icon="heart"
        onClick={() => handleSortClick("votes")}
      >
        <span className="button-text">Votes</span>
      </Button>
      <Button
        className="sort-button bp3-minimal"
        icon="chat"
        onClick={() => handleSortClick("comment_count")}
      >
        <span className="button-text">Comments</span>
      </Button>
      <Button
        className="sort-button bp3-minimal"
        icon="calendar"
        onClick={() => handleSortClick("created_at")}
      >
        <span className="button-text">Date</span>
      </Button>
    </div>
  );
};

export default SortButtons;
