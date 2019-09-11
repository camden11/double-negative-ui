import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import GlobalStyle from "../style/global";

const Base = ({ children }) => (
  <div className="container">
    <Head>
      <title>Double Negative</title>
      <link rel="stylesheet" href="https://use.typekit.net/obe8lnn.css" />
    </Head>
    <GlobalStyle />
    <Nav />
    <div className="main-content">{children}</div>
    <Footer />
    <style jsx>{`
      .container {
        padding-top: 20px;
        width: 90%;
        max-width: 1100px;
        margin: 0 auto;
      }

      .main-content {
        margin-top: 70px;
      }

      @media (max-width: 992px) {
        .container {
          width: 85%;
        }
      }
    `}</style>
  </div>
);

export default Base;
