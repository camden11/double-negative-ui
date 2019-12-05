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

      figure img {
        width: auto;
      }

      .subheading > p {
        font-size: 20px;
        margin-bottom: 30px;
        margin-top: 0;
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

      h4 {
        margin-top: 20px;
        font-family: nimbus-sans-extended;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 14px;
      }

      h1,
      h2,
      h3,
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
        text-transform: uppercase;
        background: transparent;
        font-size: 16px;
      }

      button:hover {
        background-color: #000;
        color: #fff;
      }

      button:focus {
        outline: none;
      }

      .checkbox {
        cursor: pointer;
      }

      input[type="checkbox"] {
        display: none;
      }

      input[type="checkbox"] + .checkbox-icon {
        display: inline-block;
        position: relative;
        top: -1px;
        width: 12px;
        height: 12px;
        margin: -1px 10px 0 0;
        vertical-align: middle;
        background: white left top no-repeat;
        border: 2px solid #000;
        outline: 2px solid #fff;
        outline-offset: -4px;
      }
      input[type="checkbox"]:checked + .checkbox-icon {
        background: #000;
      }

      ul {
        list-style-type: none;
        padding: 0;
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
