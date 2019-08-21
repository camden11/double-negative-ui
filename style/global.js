import React from "react";

const GlobalStyle = () => (
  <>
    <style jsx global>{`
      body {
        font-family: nimbus-sans, sans-serif;
      }

      img {
        width: 100%;
      }

      p {
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 20px;
      }

      h1 {
        margin-bottom: 15px;
        text-transform: uppercase;
        font-size: 40px;
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
      h6,
      p {
        margin-top: 0;
      }

      a {
        color: #000;
      }

      a:visited {
        color: #000;
      }

      button {
        font-family: nimbus-sans, sans-serif;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      .post-byline {
        font-family: nimbus-sans-extended;
        font-weight: 700;
        font-size: 12px;
      }

      .post-date {
        font-family: nimbus-sans-extended;
        color: #999;
        font-size: 12px;
      }
    `}</style>
  </>
);

export default GlobalStyle;
