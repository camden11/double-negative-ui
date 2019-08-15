import React from "react";

const GlobalStyle = () => (
  <>
    <style jsx>{`
      :global(body) {
        font-family: sans-serif;
      }
    `}</style>
  </>
);

export default GlobalStyle;
