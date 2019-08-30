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
    setFilter(category, genreFilter);
  };

  setGenre = genre => {
    const { setFilter, categoryFilter, genreFilter } = this.props;
    const index = genreFilter.indexOf(genre);
    if (index === -1) {
      genreFilter.push(genre);
    } else {
      genreFilter.splice(index, 1);
    }
    setFilter(categoryFilter, genreFilter);
  };

  render() {
    const { mobileOpen, genresOpen } = this.state;
    const { genres, genreFilter } = this.props;
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
                  All Stories
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("news")}
                >
                  News
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("review")}
                >
                  Reviews
                </button>
                <button
                  className="filter"
                  onClick={() => this.setCategory("show")}
                >
                  Shows
                </button>
              </div>
              <div className="mobile-filter-genres">
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index}>
                      <span
                        className="checkbox"
                        onClick={() => this.setGenre(genre.slug)}
                      >
                        <input
                          type="checkbox"
                          readOnly
                          checked={genreFilter.includes(genre.slug)}
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
        </div>
        <div className="filter-bar">
          <button className="filter" onClick={() => this.setCategory(null)}>
            All Stories
          </button>
          <button className="filter" onClick={() => this.setCategory("news")}>
            News
          </button>
          <button className="filter" onClick={() => this.setCategory("review")}>
            Reviews
          </button>
          <button className="filter" onClick={() => this.setCategory("show")}>
            Shows
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
                      onClick={() => this.setGenre(genre.slug)}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={genreFilter.includes(genre.slug)}
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
            margin-bottom: 50px;
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
          }

          .mobile-filter-genres {
            flex: 2;
          }

          @media (max-width: 768px) {
            .filter-bar {
              display: none;
            }

            .mobile-filter-toggle {
              display: flex;
            }

            .mobile-filter-bar {
              display: flex;
            }
          }
        `}</style>
      </>
    );
  }
}

export default FilterBar;
