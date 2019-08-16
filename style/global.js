import React from "react";

const GlobalStyle = () => (
  <>
    <style jsx global>{`
      body {
        font-family: nimbus-sans, sans-serif;
      }

      p {
        font-weight: 400;
        font-size: 14px;
      }

      h3 {
        font-weight: 400;
        font-size: 21px;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
      }
    `}</style>
  </>
);

export default GlobalStyle;
