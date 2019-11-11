import React, { Component } from "react";

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      genresOpen: false
    };
  }

  toggleFilter = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    });
  };

  toggleGenres = () => {
    this.setState({
      genresOpen: !this.state.genresOpen
    });
  };

  setCategory = category => {
    const { setFilter, genreFilter } = this.props;
    setFilter(category, genreFilter, 0);
  };

  setGenre = genre => {
    const { setFilter, categoryFilter, genreFilter } = this.props;
    const index = genreFilter.indexOf(genre);
    if (index === -1) {
      genreFilter.push(genre);
    } else {
      genreFilter.splice(index, 1);
    }
    setFilter(categoryFilter, genreFilter, 0);
  };

  getCurrentFilterText() {
    const { categoryFilter, genreFilter } = this.props;
    if (!categoryFilter && genreFilter.length === 0) {
      return "All Stories";
    }
    let pluralizedCategory;
    if (categoryFilter && categoryFilter[categoryFilter.length - 1] !== "s") {
      pluralizedCategory = `${categoryFilter}s`;
    } else {
      pluralizedCategory = categoryFilter;
    }
    if (genreFilter.length === 0) {
      return pluralizedCategory;
    } else if (genreFilter.length === 1) {
      const categoryText = pluralizedCategory ? `${pluralizedCategory}` : "";
      return `${genreFilter[0]} ${categoryText}`;
    } else if (genreFilter.length === 2) {
      const categoryText = pluralizedCategory ? `${pluralizedCategory}` : "";
      return `${genreFilter.join(" & ")} ${categoryText}`;
    } else if (genreFilter.length === 3) {
      const categoryText = pluralizedCategory ? `${pluralizedCategory}: ` : "";
      const genreText = `${genreFilter[0]}, ${genreFilter[1]}, and ${
        genreFilter[2]
      }`;
      return `${categoryText}${genreText}`;
    } else {
      const categoryText = pluralizedCategory ? `${pluralizedCategory}: ` : "";
      return `${categoryText}Multiple Genres`;
    }
  }

  render() {
    const { mobileOpen, genresOpen } = this.state;
    const { genres, genreFilter } = this.props;
    const currentFilterText = this.getCurrentFilterText();
    return (
      <>
        <div className="mobile-filter-toggle">
          <div className="mobile-filter-border"></div>
          <button onClick={this.toggleFilter}>
            {mobileOpen ? "Close" : "Filter"}
          </button>
        </div>
        <div className="mobile-filter-wrapper">
          {mobileOpen && (
            <div className="mobile-filter-bar">
              <div className="mobile-filter-categories">
                <button
                  className="filter"
                  onClick={() => this.setCategory(null)}
                >
                  All
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("news")}
                >
                  News
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("album")}
                >
                  Albums
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("track")}
                >
                  Tracks
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("show")}
                >
                  Shows
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("feature")}
                >
                  Features
                </button>
              </div>
              <div className="mobile-filter-genres">
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index}>
                      <span
                        className="checkbox"
                        onClick={() => this.setGenre(genre.uid)}
                      >
                        <input
                          type="checkbox"
                          readOnly
                          checked={genreFilter.includes(genre.uid)}
                        />
                        <span className="checkbox-icon"></span>
                        {genre.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="current-filter mobile-current-filter">
            {currentFilterText === "All Stories" ? "" : currentFilterText}
          </div>
        </div>
        <div className="filter-bar">
          <div className="current-filter">{currentFilterText}</div>
          <button className="filter" onClick={() => this.setCategory(null)}>
            All
          </button>
          <button className="filter" onClick={() => this.setCategory("news")}>
            News
          </button>
          <button className="filter" onClick={() => this.setCategory("album")}>
            Albums
          </button>
          <button className="filter" onClick={() => this.setCategory("track")}>
            Tracks
          </button>
          <button className="filter" onClick={() => this.setCategory("show")}>
            Shows
          </button>
          <button
            className="filter"
            onClick={() => this.setCategory("feature")}
          >
            Features
          </button>
          <button className="filter genres" onClick={this.toggleGenres}>
            Genres{" "}
            {genresOpen ? (
              <span className="minus-icon">–</span>
            ) : (
              <span className="plus-icon">+</span>
            )}
          </button>
          {genresOpen && (
            <div className="filter-genre-select">
              <ul>
                {genres.map((genre, index) => (
                  <li key={index}>
                    <span
                      className="checkbox"
                      onClick={() => this.setGenre(genre.uid)}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={genreFilter.includes(genre.uid)}
                      />
                      <span className="checkbox-icon"></span>
                      {genre.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
            flex-grow: 1;
            font-family: nimbus-sans;
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

          .filter.genres {
            padding-right: 12px;
            position: relative;
          }

          .plus-icon,
          .minus-icon {
            position: absolute;
            bottom: 4px;
            right: 0;
          }

          .minus-icon {
            bottom: 5px;
          }

          .plus-icon {
            font-weight: 700;
          }

          .filter-genre-select {
            position: absolute;
            z-index: 1;
            background-color: #fff;
            border: 2px solid #000;
            top: 34px;
            padding: 15px;
          }

          .filter-genre-select ul,
          .mobile-filter-genres ul {
            margin: 0;
          }

          .filter-genre-select ul li,
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
  }
}

export default FilterBar;
