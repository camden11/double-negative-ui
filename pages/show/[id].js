import React from "react";
import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import FilterBar from "../../components/filterBar";
import ShowGrid from "../../components/showGrid";
import ShowPreview from "../../components/showPreview";
import getGenreName from "../../utils/getGenreName";
import AirtableClient from "../../transport/airtable";

const Show = ({ show, shows }) => {
  console.log(show);
  return (
    <>
      <div className="container">
        <h1>{_.get(show, "fields['Title']")}</h1>
        <p>
          {moment
            .utc(_.get(show, "fields['Date']"))
            .format("dddd MMMM DD [at] hA")}
          <br />
          {_.get(show, "fields['Venue']")}
        </p>
        <h4>Tagged under</h4>
        <ul>
          {_.get(show, "fields['Genre UIDs']", "")
            .split(",")
            .map(genre => (
              <li>
                <Link href={{ pathname: "/shows", query: { genre: genre } }}>
                  <a>{getGenreName(genre)}</a>
                </Link>
              </li>
            ))}
        </ul>
        <div className="button-container">
          <a href={_.get(show, "fields['URL']")} className="button-large">
            View on Facebook
          </a>
        </div>
      </div>
      <div className="container">
        <FilterBar
          overrideFilterText={`More ${getGenreName(
            _.get(show, "fields['Genre UIDs']").split(",")[0]
          )} shows in ${_.get(show, "fields['City']")}`}
        />
        <ShowGrid>
          {shows.map((show, index) => (
            <ShowPreview show={show} key={index} />
          ))}
        </ShowGrid>
        <div className="button-container">
          <a href={{ pathname: "shows" }} className="button-large">
            All Shows
          </a>
        </div>
      </div>
      <style jsx>{`
        p {
          font-size: 20px;
          line-height: 1.2;
          margin-bottom: 40px;
        }

        h4 {
          margin-bottom: 0;
        }

        ul {
          margin-top: 10px;
        }

        li a {
          text-transform: uppercase;
        }

        .button-container {
          text-align: right;
          margin-top: 20px;
        }

        .button-large {
          display: inline;
        }

        .container {
          padding-bottom: 80px;
        }

        @media (max-width: 768px) {
          ul {
            margin-bottom: 100px;
          }

          .button-container {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
};

Show.getInitialProps = async ({ query }) => {
  const { id } = query;
  const show = await AirtableClient.fetchShow(id);
  const shows = await AirtableClient.fetchShows(
    _.get(show, "fields['City UID']"),
    4,
    [_.get(show, "fields['Genre UIDs']").split(",")[0]],
    show
  );
  return {
    show,
    shows
  };
};

export default Show;
