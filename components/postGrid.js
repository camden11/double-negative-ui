import React from "react";

const PostGrid = ({ children }) => (
  <>
    <div className="post-grid">{children}</div>
    <style jsx>{`
      .post-grid {
        margin-top: 70px;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 20px;
      }
    `}</style>
  </>
);

export default PostGrid;
