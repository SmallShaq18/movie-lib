// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="d-flex justify-content-between align-items-center my-4">
      <button className="btn btn-outline-secondary"
        onClick={() => {
          onPageChange(page - 1);
        }}
        disabled={page === 1} >
        ◀️ Prev
      </button>

      <span>Page {page} of {totalPages}</span>

      <button className="btn btn-outline-secondary"
        onClick={() => {
          onPageChange(page + 1);
        }}
        disabled={page === totalPages} >
        Next ▶️
      </button>
    </div>
  );
}
