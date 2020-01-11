import React from "react";
import Head from "next/head";
import PostPage from "../../components/postPage";
import postPageGetInitialProps from "../../utils/postPageGetInitialProps";

const News = props => {
  return (
    <>
      <Head>
        <title>News | Double Negative</title>
        <meta
          name="description"
          content="Album releases and other music news"
        />
        <meta property="og:title" content="News | Double Negative" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://doublenegative.cc/posts/news" />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <PostPage {...props} title="News" />
    </>
  );
};

News.getInitialProps = postPageGetInitialProps("news");

export default News;
