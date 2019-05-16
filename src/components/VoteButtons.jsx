import React from "react";
import { Button } from "@blueprintjs/core";

const VoteButtons = ({ handleVoteClick, loggedInUser, myVote }) => {
  return (
    <span>
      <Button
        icon="thumbs-up"
        className="vote-button"
        disabled={!loggedInUser || myVote === 1}
        onClick={() => handleVoteClick(1)}
      />
      <Button
        icon="thumbs-down"
        className="vote-button"
        disabled={!loggedInUser || myVote === -1}
        onClick={() => handleVoteClick(-1)}
      />
    </span>
  );
};

export default VoteButtons;
