import React from "react";
import ReactMarkdown from "react-markdown";

const Markdown = ({ content, children }) => (
  <>
    <ReactMarkdown source={content} className="markdown">
      {children}
    </ReactMarkdown>
    <style jsx global>{`
      .markdown h1,
      .markdown h2 {
        font-size: 26px;
        text-transform: none;
        margin-top: 50px;
      }

      .markdown h3,
      .markdown h4,
      .markdown h5 {
        margin-top: 40px;
        font-family: nimbus-sans-extended;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 16px;
      }

      .markdown h6 {
        font-family: nimbus-sans-extended;
        font-weight: 400;
        font-size: 12px;
        color: #999;
        margin-top: -40px;
      }

      .markdown p {
        font-size: 16px;
        line-height: 1.5;
      }

      .markdown blockquote {
        margin-top: 40px;
        margin-bottom: 40px;
      }

      .markdown blockquote p {
        font-family: nimbus-sans-extended;
        font-weight: 700;
        font-size: 24px;
        position: relative;
      }

      .markdown blockquote p::before {
        position: absolute;
        left: -20px;
        content: "“";
      }

      .markdown img {
        width: 100%;
        margin: 30px 0;
      }

      .markdown ul {
        list-style-type: disc;
        padding-left: 20px;
      }
    `}</style>
  </>
);

export default Markdown;
