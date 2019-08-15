import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import GlobalStyle from "../style/global";

const Base = ({ children }) => (
  <>
    <Head>
      <title>Double Negative</title>
    </Head>
    <GlobalStyle />
    <Nav />
    {children}
  </>
);

export default Base;
