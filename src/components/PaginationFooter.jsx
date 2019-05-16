import React from "react";

import { Button } from "@blueprintjs/core";

const PaginationFooter = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination-footer">
      <Button
        disabled={page === 1}
        icon="double-chevron-left"
        className="pagination-button"
        onClick={() => {
          setPage(1);
        }}
      />
      <Button
        disabled={page === 1}
        icon="chevron-left"
        className="pagination-button"
        onClick={() => {
          setPage(page - 1);
        }}
      />
      <span className="pagination-button">
        Page {page} of {Math.max(totalPages, 1)}
      </span>
      <Button
        disabled={page === totalPages}
        icon="chevron-right"
        className="pagination-button"
        onClick={() => {
          setPage(page + 1);
        }}
      />
      <Button
        disabled={page === totalPages}
        icon="double-chevron-right"
        className="pagination-button"
        onClick={() => {
          setPage(totalPages);
        }}
      />
    </div>
  );
};

export default PaginationFooter;
