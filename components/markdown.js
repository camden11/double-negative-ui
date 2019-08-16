import React from "react";
import ReactMarkdown from "react-markdown";

const Markdown = ({ content, children }) => (
  <>
    <ReactMarkdown source={content} className="markdown">
      {children}
    </ReactMarkdown>
    <style jsx global>{`
      .markdown img {
        width: 100%;
      }
    `}</style>
  </>
);

export default Markdown;
