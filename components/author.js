import React from "react";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import _ from "lodash";

const Author = ({ author }) => {
  const email = _.get(author, "data.email", "");
  const twitter = _.get(author, "data.twitter", "");
  const instagram = _.get(author, "data.instagram", "");

  return (
    <>
      <div className="author">
        <span className="post-category">{_.get(author, "data.role")}</span>
        <div className="author-photo">
          <img
            src={_.get(author, "data.headshot.url")}
            alt={_.get(author, "data.headshot.alt", "")}
          />
        </div>
        <div className="author-bio">
          <h4>{_.get(author, "data.name")}</h4>
          <RichText render={_.get(author, "data.bio")} />
        </div>
        <div className="author-links">
          <div>
            {email && email.length > 0 && (
              <>
                <a href={`mailto:/${email}/`} target="_blank">
                  Email
                </a>
                <br />
              </>
            )}
            {twitter && twitter.length > 0 && (
              <>
                <a href={`https://twitter.com/${twitter}/`} target="_blank">
                  Twitter
                </a>
                <br />
              </>
            )}
            {instagram && instagram.length > 0 && (
              <>
                <a
                  href={`https://www.instagram.com/${instagram}/`}
                  target="_blank"
                >
                  Instagram
                </a>
                <br />
              </>
            )}
            <Link
              href={{
                pathname: `/posts/author/${author.uid}`
              }}
              as={`/posts/author/${author.uid}`}
            >
              <a>View Posts</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .author {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-column-gap: 20px;
          position: relative;
          margin-bottom: 60px;
        }

        .author-photo {
          grid-column: span 3;
        }

        .author-bio {
          grid-column: span 6;
        }

        .author-bio h4 {
          margin-top: 0;
          text-transform: none;
        }

        .author-links {
          grid-column: span 3;

          display: flex;
          align-items: flex-end;
        }

        .author-links > div {
          text-align: right;
          width: 100%;
        }

        .author-links a {
          text-transform: uppercase;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .author-photo {
            grid-column: span 12;
            margin-bottom: 30px;
          }

          .author-bio {
            grid-column: span 12;
          }

          .author-bio h4 {
            margin-bottom: 10px;
          }

          .author-links {
            grid-column: span 12;
            text-align: left;
          }
        }
      `}</style>
    </>
  );
};

export default Author;
