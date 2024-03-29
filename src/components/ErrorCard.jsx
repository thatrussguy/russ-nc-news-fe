import React from "react";
import { Card } from "@blueprintjs/core";

const ErrorCard = ({ error: { message, status } }) => {
  return (
    <Card className="error-card">
      <h1 data-cy="error-status">Oops... {status}</h1>
      <p>{message}</p>
    </Card>
  );
};

export default ErrorCard;
