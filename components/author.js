import React from "react";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import _ from "lodash";

const Author = ({ author }) => {
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
            <a
              href={`https://twitter.com/${_.get(author, "data.twitter")}/`}
              target="_blank"
            >
              Twitter
            </a>
            <br />
            <a
              href={`https://www.instagram.com/${_.get(
                author,
                "data.instagram"
              )}/`}
              target="_blank"
            >
              Instagram
            </a>
            <br />
            <Link
              href={{
                pathname: `/posts/author/${author.uid}`,
                as: `/posts/author/${author.uid}`
              }}
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
          text-align: right;
          display: flex;
          align-items: flex-end;
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
