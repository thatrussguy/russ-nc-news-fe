import React from "react";
import { Link } from "@reach/router";

const PaginationFooter = ({ currentPage, totalPages, uri }) => {
  const baseUri = uri.endsWith(currentPage)
    ? `${uri.substr(0, uri.lastIndexOf("/"))}/`
    : uri.endsWith("/")
    ? uri
    : `${uri}/`;

  return (
    <nav>
      {currentPage > 1 && (
        <Link
          to={`${baseUri}${currentPage === "2" ? "" : Number(currentPage) - 1}`}
        >
          Prev page |
        </Link>
      )}{" "}
      Page {currentPage} |{" "}
      {currentPage < totalPages && (
        <Link to={`${baseUri}${Number(currentPage) + 1}`}>Next page</Link>
      )}
    </nav>
  );
};

export default PaginationFooter;
