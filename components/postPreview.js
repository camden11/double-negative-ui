import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import _ from "lodash";
import Heading from "./heading";

const PostPreview = ({ post }) => (
  <>
    <Link
      href={{ pathname: "/post/[slug]", query: { slug: post.slug } }}
      as={`/post/${post.slug}`}
    >
      <a className="post-preview">
        <span className="post-category">
          {_.get(post, "categories[0].name")}
        </span>
        <div
          className="image"
          style={{ backgroundImage: `url(${_.get(post, "featureImage.url")})` }}
        />
        <div className="post-info">
          <div className="post-heading">
            <Heading level={3}>{post.title}</Heading>
          </div>
          <div className="post-meta">
            <span className="post-byline">by {_.get(post, "author.name")}</span>
            <span className="post-date">
              {" /"} <Moment date={post.publishDate} format="MMM DD YYYY" />
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
         {
          /* overflow: visible; */
        }
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

      .post-category {
        display: block;
        position: absolute;
        transform: rotate(-90deg);
        transform-origin: bottom right;
        text-transform: uppercase;
        right: calc(100% + 6px);
        top: -20px;
      }

      .image {
        width: 100%;
        padding-bottom: 100%;
        background-size: cover;
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

export default PostPreview;
