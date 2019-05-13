import React from "react";
import { Link } from "@reach/router";

const PaginationFooter = ({ currentPage = 1, totalPages }) => {
  return (
    <nav>
      {currentPage > 1 && (
        <Link to={`/${currentPage === "2" ? "" : Number(currentPage) - 1}`}>
          Prev page |
        </Link>
      )}{" "}
      Page {currentPage} |{" "}
      {currentPage < totalPages && (
        <Link to={`/${Number(currentPage) + 1}`}>Next page</Link>
      )}
    </nav>
  );
};

export default PaginationFooter;
