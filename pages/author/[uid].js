import React, { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Prismic from "prismic-javascript";
import _ from "lodash";
import PostGrid from "../../components/postGrid";
import PostPreview from "../../components/postPreview";
import Pagination from "../../components/pagination";
import PrismicClient from "../../transport/prismic";
import allPostsQuery from "../../queries/allPosts";
import constants from "../../constants";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  changePage = page => {
    const { genreQuery, categoryQuery } = this.props;
    this.setFilter(categoryQuery, genreQuery, page);
  };

  render() {
    const { posts, postCount, pageQuery, author } = this.props;
    const authorData = author.data;
    const numPages = Math.ceil(postCount / constants.POST_LIMIT);
    return (
      <>
        <Head>
          <title>Posts by {_.get(authorData, "name")} | Double Negative</title>
          <meta
            name="description"
            content="Double Negative is a very underground music blog."
          />
          <meta property="og:title" content="Double Negative" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://doublenegative.cc" />
          <meta property="og:image" content="/public/og_image.png" />
        </Head>
        <div className="posts-header">Posts by {_.get(authorData, "name")}</div>
        <PostGrid>
          {posts.map((doc, index) => (
            <PostPreview doc={doc} key={index} />
          ))}
        </PostGrid>
        <Pagination
          numPages={numPages}
          currentPage={pageQuery}
          onChangePage={this.changePage}
        />
        <style jsx>
          {`
            .posts-header {
              padding-top: 10px;
              flex-grow: 1;
              font-family: nimbus-sans;
              font-weight: 700;
              text-transform: uppercase;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              border-bottom: 2px solid #000;
              padding-bottom: 5px;
              margin-bottom: 50px;
            }
          `}
        </style>
      </>
    );
  }
}

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
