import React from "react";

const PostGrid = ({ children }) => (
  <>
    <div className="post-grid">{children}</div>
    <style jsx>{`
      .post-grid {
        margin-top: 100px;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
      }
    `}</style>
  </>
);

export default PostGrid;
