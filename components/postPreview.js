import React from "react";
import Link from "next/link";
import Heading from "./heading";

const PostPreview = ({ post }) => (
  <>
    <Link href={`/post/${post.slug}`}>
      <a className="post-preview">
        <img src={post.featureImage.url} />
        <div className="post-info">
          <Heading level={3}>{post.title}</Heading>
          <span className="byline">by {post.author.name}</span>
          <span className="data">{post.updatedAt}</span>
        </div>
      </a>
    </Link>
    <style jsx>{`
      .post-preview {
        display: block;
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
      }

      .byline {
        font-family: nimbus-sans-extended;
        font-weight: 700;
        font-size: 12px;
      }
    `}</style>
  </>
);

export default PostPreview;
