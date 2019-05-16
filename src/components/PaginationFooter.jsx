import React from "react";

import { Button } from "@blueprintjs/core";

const PaginationFooter = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination-footer">
      <Button
        className="pagination-button bp3-minimal"
        disabled={page === 1}
        icon="double-chevron-left"
        onClick={() => {
          setPage(1);
        }}
      />
      <Button
        className="pagination-button bp3-minimal"
        disabled={page === 1}
        icon="chevron-left"
        onClick={() => {
          setPage(page - 1);
        }}
      />
      <span className="pagination-button">
        Page {page} of {Math.max(totalPages, 1)}
      </span>
      <Button
        className="pagination-button bp3-minimal"
        disabled={page === totalPages}
        icon="chevron-right"
        onClick={() => {
          setPage(page + 1);
        }}
      />
      <Button
        className="pagination-button bp3-minimal"
        disabled={page === totalPages}
        icon="double-chevron-right"
        onClick={() => {
          setPage(totalPages);
        }}
      />
    </div>
  );
};

export default PaginationFooter;
