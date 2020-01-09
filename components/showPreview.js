import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import getGenreName from "../utils/getGenreName";
import _ from "lodash";

const ShowPreview = ({ show }) => {
  return (
    <>
      <Link
        href={{ pathname: "/show/[id]", query: { id: show.id } }}
        as={`/show/${show.id}`}
      >
        <a className="show-preview">
          <span className="post-category">
            {getGenreName(_.get(show, "fields['Genre UIDs']").split(",")[0])}
          </span>
          <div className="show-preview-content">
            <div className="show-date-section">
              <span className="show-day">
                <Moment date={_.get(show, "fields['Date']")} format="ddd" />
              </span>
              <br />
              <span className="show-date">
                <Moment date={_.get(show, "fields['Date']")} format="MMM D" />
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
          width: 80px;
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
