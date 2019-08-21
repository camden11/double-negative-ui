import React from "react";

const FilterBar = () => (
  <>
    <div className="filter-bar">
      <button className="filter">News</button>
      <button className="filter">Reviews</button>
      <button className="filter">Shows</button>
      <button className="filter">Genres</button>
    </div>
    <style jsx>{`
      .filter-bar {
        display: flex;
        justify-content: flex-end;
        border-bottom: 2px solid #000;
        margin-bottom: 50px;
      }

      .filter {
        display: block;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 16px;
        text-transform: uppercase;
      }
    `}</style>
  </>
);

export default FilterBar;
