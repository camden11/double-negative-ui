import React from "react";

const PostGrid = ({ children }) => (
  <>
    {children.length > 0 && <div className="post-grid">{children}</div>}
    {children.length === 0 && (
      <p className="no-posts">No stories found. Try changing your filters.</p>
    )}
    <style jsx>{`
      .post-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 60px;
      }

      .no-posts {
        margin-top: 200px;
        color: #999;
        text-align: center;
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
