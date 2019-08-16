import React from "react";
import Link from "next/link";
import Moment from "react-moment";
import Heading from "./heading";

const PostPreview = ({ post }) => (
  <>
    <Link href={`/post/${post.slug}`}>
      <a className="post-preview">
        <img src={post.featureImage.url} />
        <div className="post-info">
          <div className="post-heading">
            <Heading level={3}>{post.title}</Heading>
          </div>
          <div className="post-meta">
            <span className="post-byline">by {post.author.name}</span>
            <span className="post-date">
              {" /"} <Moment date={post.updatedAt} format="MMM DD YYYY" />
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

      img {
        width: 100%;
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

      .post-byline {
        font-family: nimbus-sans-extended;
        font-weight: 700;
        font-size: 12px;
      }

      .post-date {
        font-family: nimbus-sans-extended;
        color: #999;
        font-size: 12px;
      }
    `}</style>
  </>
);

export default PostPreview;
