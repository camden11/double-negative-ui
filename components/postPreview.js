import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import { RichText } from "prismic-reactjs";
import _ from "lodash";
import Byline from "../components/byline";
import getPublishDate from "../utils/getPublishDate";

const PostPreview = ({ doc, doc: { data } }) => {
  const publishDate = getPublishDate(doc);
  _.set(data, "title[0].type", "heading3");
  return (
    <>
      <Link
        href={{ pathname: "/post/[uid]", query: { uid: doc.uid } }}
        as={`/post/${doc.uid}`}
      >
        <a className="post-preview">
          <span className="post-category">
            {_.get(data, "categories[0].category.data.name")}
          </span>
          <div
            className="image"
            style={{
              backgroundImage: `url(${_.get(data, "feature_image.url")})`
            }}
          />
          <div className="post-info">
            <div className="post-heading">
              <RichText render={data.title} />
            </div>
            <div className="post-meta">
              <Byline data={data} />
              <span className="post-date">
                {" /"} <Moment date={publishDate} format="MMM DD YYYY" />
              </span>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .post-preview {
          display: flex;
          flex-direction: column;
          border: 2px solid #000;
          grid-column: span 4;
          color: #000;
          text-decoration: none;
          position: relative;
          margin-bottom: 60px;
        }

        .post-preview:visited {
          color: #000;
        }

        @media (max-width: 992px) {
          .post-preview {
            grid-column: span 6;
          }
        }

        @media (max-width: 768px) {
          .post-preview {
            grid-column: span 12;
          }
        }

        .image {
          width: 100%;
          padding-bottom: 66.66666%;
          background-size: cover;
          background-position: center center;
        }

        .post-info {
          padding: 20px 15px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .post-heading {
          flex-grow: 1;
        }
      `}</style>
    </>
  );
};

export default PostPreview;
