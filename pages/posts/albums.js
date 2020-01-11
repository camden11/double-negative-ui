import React from "react";
import Head from "next/head";
import PostPage from "../../components/postPage";
import postPageGetInitialProps from "../../utils/postPageGetInitialProps";

const Albums = props => {
  return (
    <>
      <Head>
        <title>Albums | Double Negative</title>
        <meta
          name="description"
          content="Coverage of our favorite recent albums."
        />
        <meta property="og:title" content="Albums | Double Negative" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://doublenegative.cc/posts/albums"
        />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <PostPage {...props} title="Albums" />
    </>
  );
};

Albums.getInitialProps = postPageGetInitialProps("album");

export default Albums;
