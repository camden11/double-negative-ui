import React from "react";

const PostGrid = ({ children }) => (
  <>
    <div className="post-grid">{children}</div>
    <style jsx>{`
      .post-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 60px;
      }

      @media (max-width: 768px) {
        .post-grid {
          grid-column-gap: 0;
        }
      }
    `}</style>
  </>
);

export default PostGrid;
