import React from "react";
import { RichText } from "prismic-reactjs";
import _ from "lodash";
import Moment from "react-moment";
import Link from "next/link";
import Byline from "../components/byline";
import getPublishDate from "../utils/getPublishDate";
import getOptimizedImage from "../utils/getOptimizedImage";

const NUM_COLUMNS = 12;

const FeaturedPost = ({ doc, doc: { data } }) => {
  const publishDate = getPublishDate(doc);
  const imageDimensions = _.get(data, "feature_image.dimensions");
  const imageColumnSize =
    imageDimensions.width > imageDimensions.height ? 5 : 4;
  const imageSrc = getOptimizedImage(_.get(data, "feature_image.url"), {
    width: 630
  });

  const PostLink = ({ className, children }) => (
    <Link
      href={{ pathname: "/post/[uid]", query: { uid: doc.uid } }}
      as={`/post/${doc.uid}`}
    >
      <a className={className}>{children}</a>
    </Link>
  );

  return (
    <div className="container">
      <div className="featured-post">
        <div className="featured-post-image">
          <PostLink>
            <img
              className="post-feature-image"
              src={imageSrc}
              alt={_.get(data, "feature_image.alt", "")}
            />
          </PostLink>
          <span className="post-category">
            {_.get(data, "categories[0].category.data.name")}
          </span>
        </div>
        <div className="featured-post-preview">
          <div className="featured-post-preview-content">
            <PostLink>
              <RichText render={data.title} />
            </PostLink>
            <div className="subheading">
              <RichText render={data.blurb} />
            </div>
            <div className="featured-post-meta">
              <Byline data={data} />
              <span className="post-date">
                {" /"} <Moment date={publishDate} format="MMM DD YYYY" />
              </span>
            </div>
          </div>
          <div className="button-container">
            <PostLink className="button-large">Read more</PostLink>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .featured-post {
          display: grid;
          grid-template-columns: repeat(${NUM_COLUMNS}, 1fr);
          grid-column-gap: 60px;
          padding: 40px 0 60px;
        }

        .featured-post-image {
          grid-column: span ${imageColumnSize};
          position: relative;
        }

        .featured-post-preview {
          grid-column: span ${NUM_COLUMNS - imageColumnSize};
          display: flex;
          flex-direction: column;
        }

        .featured-post-preview-content {
          flex-grow: 1;
        }

        .featured-post-preview-content a {
          text-decoration: none;
        }

        .featured-post-meta {
          padding-top: 10px;
          margin-bottom: 10px;
        }

        .featured-post .button-large {
          float: right;
          margin-bottom: 2px;
        }

        @media (max-width: 992px) {
          .featured-post h1 {
            font-size: 32px;
          }

          .featured-post .subheading > p {
            font-size: 16px;
          }

          .featured-post-image {
            grid-column: span ${imageColumnSize + 1};
          }

          .featured-post-preview {
            grid-column: span ${NUM_COLUMNS - imageColumnSize - 1};
          }

          .featured-post-meta {
            margin-bottom: 30px;
          }
        }

        @media (max-width: 768px) {
          .featured-post {
            grid-column-gap: 0;
            padding-top: 10px;
          }

          .featured-post-image {
            grid-column: span 12;
            margin-bottom: 30px;
          }

          .featured-post-preview {
            grid-column: span 12;
          }

          .featured-post h1 {
            margin-bottom: 10px;
          }

          .featured-post .subheading > p {
            margin-bottom: 10px;
          }

          .featured-post-meta {
            padding-top: 15px;
            margin-bottom: 40px;
          }

          .featured-post .button-large {
            float: left;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedPost;
