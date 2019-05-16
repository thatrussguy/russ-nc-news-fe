import { Card } from "@blueprintjs/core";
import React from "react";

const ErrorCard = ({ error: { status, message } }) => {
  return (
    <Card className="error-card">
      <h1>Oops... {status}</h1>
      <p>{message}</p>
    </Card>
  );
};

export default ErrorCard;
