import React, { Component } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { initGA, logPageView } from "../utils/analytics";
import GlobalStyle from "../style/global";

class Base extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    const { children } = this.props;
    return (
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
  }
}

export default Base;
