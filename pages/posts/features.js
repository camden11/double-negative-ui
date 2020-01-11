import React from "react";
import Head from "next/head";
import PostPage from "../../components/postPage";
import postPageGetInitialProps from "../../utils/postPageGetInitialProps";

const Features = props => {
  return (
    <>
      <Head>
        <title>Features | Double Negative</title>
        <meta
          name="description"
          content="Profiles and interviews featuring our favorite new artists"
        />
        <meta property="og:title" content="Features | Double Negative" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://doublenegative.cc/posts/features"
        />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <PostPage {...props} title="features" />
    </>
  );
};

Features.getInitialProps = postPageGetInitialProps("feature");

export default Features;
