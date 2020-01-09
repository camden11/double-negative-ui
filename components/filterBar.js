import React, { useState, useEffect } from "react";
import setFilter from "../utils/setFilter";
import { getPostFilterText, getShowFilterText } from "../utils/getFilterText";
import _ from "lodash";

const FilterBar = ({
  genres,
  genreFilter,
  cities,
  cityFilter,
  category,
  postMode
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const setGenre = genre => {
    const index = genreFilter.indexOf(genre);
    if (index === -1) {
      genreFilter.push(genre);
    } else {
      genreFilter.splice(index, 1);
    }
    setFilter(cityFilter, genreFilter, 0);
  };

  const filterText = postMode
    ? getPostFilterText(genreFilter, category)
    : getShowFilterText(genreFilter, cityFilter);

  return (
    <>
      <div className="mobile-filter-toggle">
        <div className="mobile-filter-border"></div>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? "Close" : "Filter"}
        </button>
      </div>
      <div className="mobile-filter-wrapper">
        {mobileOpen && (
          <div className="mobile-filter-bar">
            <div className="mobile-filter-categories">
              <a className="filter">All</a>
              <a className="filter">News</a>
              <a className="filter">Albums</a>
              <a className="filter">Tracks</a>
              <a className="filter">Shows</a>
              <a className="filter">Features</a>
            </div>
            <div className="mobile-filter-genres">
              <ul>
                {genres.map((genre, index) => (
                  <li key={index}>
                    <span
                      className="checkbox"
                      onClick={() => setGenre(_.get(genre, "uid"))}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={genreFilter.includes(_.get(genre, "uid"))}
                      />
                      <span className="checkbox-icon"></span>
                      {_.get(genre, "data.name")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="current-filter mobile-current-filter">
          {filterText === "All Stories" || filterText === "All Shows"
            ? ""
            : filterText}
        </div>
      </div>
      <div className="filter-bar">
        <div className="current-filter">{filterText}</div>
        {genresOpen && (
          <div className="filter-select">
            <ul>
              {genres.map((genre, index) => (
                <li key={index}>
                  <span
                    className="checkbox"
                    onClick={() => setGenre(_.get(genre, "uid"))}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={genreFilter.includes(_.get(genre, "uid"))}
                    />
                    <span className="checkbox-icon"></span>
                    {_.get(genre, "data.name")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {postMode && (
          <button
            className="filter-button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
          >
            Tags
          </button>
        )}
        {!postMode && (
          <button
            className="filter-button"
            onClick={() => setCitiesOpen(!citiesOpen)}
          >
            Cities
          </button>
        )}
        {genres && genres.length > 0 && (
          <button
            className="filter-button"
            onClick={() => setGenresOpen(!genresOpen)}
          >
            Genres
          </button>
        )}
      </div>
      <style jsx>{`
        .filter-bar {
          display: flex;
          position: relative;
          justify-content: flex-end;
          border-bottom: 2px solid #000;
          margin-bottom: 50px;
        }

        .current-filter {
          padding-top: 10px;
          padding-bottom: 6px;
          flex-grow: 1;
          font-family: nimbus-sans-extended;
          font-weight: 700;
          text-transform: uppercase;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .filter {
          display: block;
          outline: none;
          border: none;
          background-color: transparent;
          font-size: 16px;
          text-transform: uppercase;
          cursor: pointer;
          padding: 10px 10px 5px;
        }

        .filter:hover {
          color: #000;
        }

        .filter-button {
          border: 2px solid #000;
          border-bottom: none;
          width: 90px;
        }

        .filter-button:not(:last-child) {
          border-right: none;
        }

        .filter-select {
          position: absolute;
          z-index: 1;
          background-color: #fff;
          border: 2px solid #000;
          top: 30px;
          padding: 15px;
          width: 180px;
          box-sizing: border-box;
        }

        .filter-select ul,
        .mobile-filter-genres ul {
          margin: 0;
        }

        .filter-select ul li,
        .mobile-filter-genres ul li {
          margin-bottom: 10px;
        }

        .mobile-filter-toggle {
          display: none;
          width: 100%;
        }

        .mobile-filter-border {
          flex-grow: 1;
          border-bottom: 2px solid black;
          height: 13px;
        }

        .mobile-filter-toggle button {
          border: 2px solid #000;
        }

        .mobile-filter-wrapper {
          margin-bottom: 20px;
        }

        .mobile-filter-bar {
          display: none;
          padding: 20px 0 40px;
          border-bottom: 2px solid #000;
        }

        .mobile-filter-categories {
          flex: 1;
        }

        .mobile-filter-categories .filter {
          padding: 0;
          text-decoration: underline;
          margin-bottom: 10px;
          text-align: left
        }

        .mobile-filter-genres {
          padding-left: 5px
          flex: 2;
        }

        .mobile-current-filter {
          margin-top: 30px;
          display: none;
        }

        @media (max-width: 992px) {
          .filter-bar {
            display: none;
          }

          .mobile-filter-toggle {
            display: flex;
          }

          .mobile-filter-bar {
            display: flex;
          }
          .mobile-current-filter {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default FilterBar;
