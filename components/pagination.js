import React from "react";

const Pagination = ({ numPages, currentPage, onChangePage }) => (
  <>
    <div>
      <div className="previous">
        {currentPage !== 1 && (
          <button onClick={() => onChangePage(currentPage - 1)}>
            Previous
          </button>
        )}
      </div>
      <div>
        {currentPage !== numPages && (
          <button onClick={() => onChangePage(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
    <style jsx>{`
      div {
        display: flex;
        margin-top: 10px;
      }

      button {
        display: block;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 16px;
        text-transform: uppercase;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
      }

      button:hover {
        color: #000;
      }

      .previous {
        flex-grow: 1;
      }
    `}</style>
  </>
);

export default Pagination;
