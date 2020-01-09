import React from "react";

const ShowGrid = ({ children }) => (
  <>
    {children.length > 0 && <div className="show-grid">{children}</div>}
    {children.length === 0 && (
      <p className="no-shows">No shows found. Try changing your filters.</p>
    )}
    <style jsx>{`
      .show-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 60px;
      }

      .no-shows {
        margin-top: 200px;
        color: #999;
        text-align: center;
      }

      @media (max-width: 768px) {
        .show-grid {
          grid-column-gap: 0;
        }
      }
    `}</style>
  </>
);

export default ShowGrid;
