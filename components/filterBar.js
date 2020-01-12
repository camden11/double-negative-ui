import React, { useState } from "react";
import Link from "next/link";
import { setCookie } from "nookies";
import setFilter from "../utils/setFilter";
import { getPostFilterText, getShowFilterText } from "../utils/getFilterText";
import _ from "lodash";

const MENU_TYPES = {
  CITIES: "cities",
  GENRES: "genres",
  categories: "categories"
};

const FilterBar = ({
  genres,
  genreFilter,
  cities,
  cityFilter,
  postMode,
  overrideFilterText,
  homePage,
  page,
  hideCategories
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

  const setCity = city => {
    setFilter(city, genreFilter, 0);
    setCookie({}, "dn-city", city);
  };

  let filterText;

  if (overrideFilterText) {
    filterText = overrideFilterText;
  } else {
    filterText = postMode
      ? getPostFilterText(genreFilter, page)
      : getShowFilterText(genreFilter, cityFilter, homePage);
  }

  return (
    <>
      {((postMode && !hideCategories) || cities || genres) && (
        <div className="mobile-filter-toggle">
          <div className="mobile-filter-border"></div>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? "Close" : "Filter"}
          </button>
        </div>
      )}
      <div className="mobile-filter-wrapper">
        {mobileOpen && (
          <div className="mobile-filter-bar">
            {postMode && (
              <div className="mobile-filter-categories">
                <Link
                  href={{
                    pathname: "/posts/all",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">All</a>
                </Link>
                <Link
                  href={{
                    pathname: "/posts/news",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">News</a>
                </Link>
                <Link
                  href={{
                    pathname: "/posts/albums",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Albums</a>
                </Link>
                <Link
                  href={{
                    pathname: "/posts/tracks",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Tracks</a>
                </Link>
                <Link
                  href={{
                    pathname: "/posts/shows",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Shows</a>
                </Link>
                <Link
                  href={{
                    pathname: "/posts/features",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Features</a>
                </Link>
              </div>
            )}
            {cities && cities.length > 0 && (
              <div className="mobile-filter-cities">
                <ul>
                  {cities.map((city, index) => (
                    <li key={index}>
                      <button
                        className="filter"
                        onClick={() => setCity(city.uid)}
                      >
                        {_.get(city, "data.name")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {genres && genres.length > 0 && (
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
            )}
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
        {citiesOpen && (
          <div className="filter-select">
            <ul>
              {cities.map((city, index) => (
                <li key={index}>
                  <button className="filter" onClick={() => setCity(city.uid)}>
                    {_.get(city, "data.name")}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {categoriesOpen && (
          <div className="filter-select">
            <ul>
              <li>
                <Link
                  href={{
                    pathname: "/posts/all",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">All</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/posts/news",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">News</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/posts/albums",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Albums</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/posts/tracks",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Tracks</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/posts/shows",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Shows</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/posts/features",
                    query: { genre: genreFilter }
                  }}
                >
                  <a className="filter">Features</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
        {postMode && !hideCategories && (
          <button
            className="filter-button filter-button-categories"
            onClick={() => {
              setCategoriesOpen(!categoriesOpen);
              setCitiesOpen(false);
              setGenresOpen(false);
            }}
          >
            Types
          </button>
        )}
        {!postMode && cities && cities.length && (
          <button
            className="filter-button filter-button-cities"
            onClick={() => {
              setCitiesOpen(!citiesOpen);
              setGenresOpen(false);
              setCategoriesOpen(false);
            }}
          >
            Cities
          </button>
        )}
        {genres && genres.length > 0 && (
          <button
            className="filter-button filter-button-genres"
            onClick={() => {
              setGenresOpen(!genresOpen);
              setCitiesOpen(false);
              setCategoriesOpen(false);
            }}
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
          margin-bottom: 10px;
          text-decoration: underline;
        }

        .filter:hover {
          color: #000;
        }

        .filter-button {
          border: 2px solid #000;
          border-bottom: none;
          width: 90px;
          transition: all 100ms;
        }

        .filter-button:not(:last-child) {
          border-right: none;
        }

        .filter-button-cities {
          background-color: ${citiesOpen ? "#000" : "#fff"};
          color: ${citiesOpen ? "#fff" : "#000"};
        }

        .filter-button-genres{
          background-color: ${genresOpen ? "#000" : "#fff"};
          color: ${genresOpen ? "#fff" : "#000"};
        }

        .filter-button-categories{
          background-color: ${categoriesOpen ? "#000" : "#fff"};
          color: ${categoriesOpen ? "#fff" : "#000"};
        }

        .filter-select {
          position: absolute;
          z-index: 1;
          background-color: #fff;
          border: 2px solid #000;
          top: 36px;
          padding: 15px;
          width: 180px;
          box-sizing: border-box;
        }

        .filter-select ul,
        .mobile-filter-genres ul, .mobile-filter-cities ul {
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

        .mobile-filter-categories, .mobile-filter-cities {
          flex: 1;
        }

        .mobile-filter-categories .filter, .mobile-filter-cities .filter {
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
