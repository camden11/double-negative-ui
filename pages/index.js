import React, { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Prismic from "prismic-javascript";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import FilterBar from "../components/filterBar";
import Pagination from "../components/pagination";
import PrismicClient from "../transport/prismic";
import Strapi from "../transport/strapi";
import allPostsQuery from "../queries/allPosts";
import constants from "../constants";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  setFilter(category, genre, page) {
    const query = {};
    if (category) {
      query.category = category;
    }
    if (genre && genre.length > 0) {
      query.genre = genre;
    }
    if (page) {
      query.page = page;
    }
    Router.push({
      pathname: "/",
      query
    });
  }

  changePage = page => {
    const { genreQuery, categoryQuery } = this.props;
    this.setFilter(categoryQuery, genreQuery, page);
  };

  render() {
    const {
      posts,
      genres,
      postCount,
      genreQuery,
      categoryQuery,
      pageQuery
    } = this.props;
    const numPages = Math.ceil(postCount / constants.POST_LIMIT);
    return (
      <>
        <Head>
          <title>Double Negative</title>
          <meta
            name="description"
            content="Double Negative is a very underground music blog."
          />
          <meta property="og:title" content="Double Negative" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://doublenegative.cc" />
          <meta property="og:image" content="/static/og_image.png" />
        </Head>
        <FilterBar
          genres={genres}
          setFilter={this.setFilter}
          categoryFilter={categoryQuery}
          genreFilter={genreQuery}
        />
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
      </>
    );
  }
}

const formatGenreQuery = query => {
  if (!query) {
    return [];
  } else if (typeof query === "string") {
    return [query];
  } else {
    return query;
  }
};

Home.getInitialProps = async function({ query }) {
  const currentPage = query.page ? +query.page : 0;
  const postParams = {
    sort: {
      field: "publishDate",
      order: "desc"
    },
    filters: [],
    start: currentPage * constants.POST_LIMIT,
    limit: constants.POST_LIMIT
  };
  if (query.category) {
    postParams.filters.push({
      field: "categories.uid",
      value: query.category
    });
  }
  const formattedGenreQuery = formatGenreQuery(query.genre);
  formattedGenreQuery.forEach(genre => {
    postParams.filters.push({
      field: "genres.uid",
      value: genre
    });
  });
  const postData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "post"),
    {
      pageSize: constants.POST_LIMIT,
      page: currentPage,
      orderings:
        "[my.post.legacy_publish_date desc, document.first_publication_date desc]",
      graphQuery: allPostsQuery
    }
  );
  console.log(postData);
  const postCount = postData.total_results_size;
  const genres = await Strapi.getEntries("genres", {
    sort: { field: "name", order: "asc" }
  });
  return {
    posts: postData.results,
    postCount,
    genres,
    genreQuery: formattedGenreQuery,
    categoryQuery: query.category,
    pageQuery: currentPage
  };
};

export default Home;
