import React from "react";
import Head from "next/head";
import PostPage from "../../components/postPage";
import postPageGetInitialProps from "../../utils/postPageGetInitialProps";

const Shows = props => {
  return (
    <>
      <Head>
        <title>Show Coverage | Double Negative</title>
        <meta
          name="description"
          content="Photos and coverage of our favorite recent shows."
        />
        <meta property="og:title" content="Show Coverage | Double Negative" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://doublenegative.cc/posts/shows"
        />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <PostPage {...props} title="Show Coverage" />
    </>
  );
};

Shows.getInitialProps = postPageGetInitialProps("show");

export default Shows;
