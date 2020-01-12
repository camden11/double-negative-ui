import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import getGenreName from "../utils/getGenreName";
import _ from "lodash";

const ShowPreview = ({ show, genreQuery }) => {
  const genreTags = _.get(show, "fields['Genre UIDs']").split(",");
  let genreTag;

  if (genreQuery && genreQuery.length) {
    for (let i = 0; i < genreQuery.length; i++) {
      if (genreTags.includes(genreQuery[i])) {
        genreTag = getGenreName(genreQuery[i]);
        break;
      }
    }
  } else {
    genreTag = genreTags[0];
  }
  return (
    <>
      <Link
        href={{ pathname: "/show/[id]", query: { id: show.id } }}
        as={`/show/${show.id}`}
      >
        <a className="show-preview">
          <span className="post-category">{genreTag}</span>
          <div className="show-preview-content">
            <div className="show-date-section">
              <span>
                <span className="show-day">
                  <Moment date={_.get(show, "fields['Date']")} format="ddd" />
                </span>
                <br />
                <span className="show-date">
                  <Moment date={_.get(show, "fields['Date']")} format="MMM D" />
                </span>
              </span>
            </div>
            <div className="show-info-section">
              <h3>{_.get(show, "fields['Title']")}</h3>
              <span className="show-venue">
                {_.get(show, "fields['Venue']")}
              </span>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .show-preview {
          grid-column: span 1;
          border: 2px solid #000;
          margin-bottom: 40px;
          text-decoration: none;
          position: relative;
        }

        .show-preview-content {
          display: flex;
          height: 100%;
        }

        .show-date-section {
          background-color: #000;
          color: #fff;
          text-align: center;
          padding: 33px 10px;
          flex-grow: 0;
          flex-shrink: 0;
          flex-basis: 100px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .show-date-section > span {
          position: relative;
          top: -4px;
        }

        .show-day {
          font-family: nimbus-sans-extended;
          text-transform: uppercase;
          font-size: 12px;
        }

        .show-date {
          font-family: nimbus-sans-extended;
          font-size: 20px;
        }

        .show-info-section {
          padding: 20px 15px;
          display: flex;
          flex-direction: column;
        }

        h3 {
          flex-grow: 1;
        }

        .show-venue {
          font-family: nimbus-sans-extended;
          font-weight: 700;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .show-preview {
            grid-column: span 2;
          }
        }
      `}</style>
    </>
  );
};

export default ShowPreview;
