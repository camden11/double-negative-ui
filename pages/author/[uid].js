import React from "react";
import Head from "next/head";
import _ from "lodash";
import Prismic from "prismic-javascript";
import PrismicClient from "../../transport/prismic";
import allPostsQuery from "../../queries/allPosts";
import PostPage from "../../components/postPage";
import constants from "../../constants";

const Home = props => {
  const { author } = props;
  const pageTitle = `Posts by ${_.get(author, "data.name")} | Double Negative`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Double Negative is a very underground music blog."
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://doublenegative.cc" />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <PostPage
        {...props}
        title={`Posts by ${_.get(author, "data.name")}`}
        hideFilters
      />
    </>
  );
};

Home.getInitialProps = async function({ query }) {
  const { uid } = query;
  const author = await PrismicClient.getByUID("author", uid);
  const currentPage = query.page ? +query.page : 1;
  const predicates = [
    Prismic.Predicates.at("document.type", "post"),
    Prismic.Predicates.at("my.post.authors.author", author.id)
  ];

  const postData = await PrismicClient.query(predicates, {
    pageSize: constants.POST_LIMIT,
    page: currentPage,
    orderings: "[document.first_publication_date desc]",
    graphQuery: allPostsQuery
  });
  const postCount = postData.total_results_size;

  return {
    author,
    posts: postData.results,
    postCount,
    pageQuery: currentPage
  };
};

export default Home;
