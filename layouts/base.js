import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import GlobalStyle from "../style/global";

const Base = ({ children }) => (
  <div className="container">
    <Head>
      <title>Double Negative</title>
      <link rel="stylesheet" href="https://use.typekit.net/obe8lnn.css" />
    </Head>
    <GlobalStyle />
    <Nav />
    {children}
    <style jsx>{`
      .container {
        padding-top: 20px;
        width: 85%;
        max-width: 1000px;
        margin: 0 auto;
      }
    `}</style>
  </div>
);

export default Base;
