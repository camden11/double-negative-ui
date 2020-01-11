import React from "react";
import Head from "next/head";
import PostPage from "../../components/postPage";
import postPageGetInitialProps from "../../utils/postPageGetInitialProps";

const All = props => {
  return (
    <>
      <Head>
        <title>All Stories | Double Negative</title>
        <meta
          name="description"
          content="All albums, tracks, shows, and features on Double Negative."
        />
        <meta property="og:title" content="All Stories | Double Negative" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://doublenegative.cc/posts/all" />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <PostPage {...props} title="All Stories" />
    </>
  );
};

All.getInitialProps = postPageGetInitialProps();

export default All;
