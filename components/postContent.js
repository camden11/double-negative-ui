import React from "react";
import Serializer from "./prismic/serializer";
import { RichText } from "prismic-reactjs";

const PostContent = ({ content }) => (
  <>
    <div className="post-content">
      <RichText render={content} htmlSerializer={Serializer} />
    </div>

    <style jsx global>{`
      .post-content h1,
      .post-content h2 {
        font-size: 26px;
        text-transform: none;
        margin-top: 50px;
      }

      .post-content h3,
      .post-content h4,
      .post-content h5 {
        margin-top: 40px;
        font-family: nimbus-sans-extended;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 16px;
      }

      .post-content h6 {
        font-family: nimbus-sans-extended;
        font-weight: 400;
        font-size: 12px;
        color: #999;
        margin-top: -40px;
      }

      .post-content p {
        font-size: 16px;
        line-height: 1.5;
      }

      .post-content blockquote {
        margin-top: 40px;
        margin-bottom: 40px;
      }

      .post-content blockquote p {
        font-family: nimbus-sans-extended;
        font-weight: 700;
        font-size: 24px;
        position: relative;
      }

      .post-content blockquote p::before {
        position: absolute;
        left: -20px;
        content: "“";
      }

      .post-content img {
        width: 100%;
        margin: 30px 0;
      }

      .post-content ul {
        list-style-type: disc;
        padding-left: 20px;
      }
    `}</style>
  </>
);

export default PostContent;
