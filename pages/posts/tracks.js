import React from "react";
import Head from "next/head";
import PostPage from "../../components/postPage";
import postPageGetInitialProps from "../../utils/postPageGetInitialProps";

const Tracks = props => {
  return (
    <>
      <Head>
        <title>Tracks | Double Negative</title>
        <meta
          name="description"
          content="Coverage of our favorite recent tracks."
        />
        <meta property="og:title" content="Tracks | Double Negative" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://doublenegative.cc/posts/tracks"
        />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <PostPage {...props} title="tracks" />
    </>
  );
};

Tracks.getInitialProps = postPageGetInitialProps("track");

export default Tracks;
