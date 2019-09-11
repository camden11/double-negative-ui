import React, { Component } from "react";
import Router from "next/router";
import Layout from "../layouts/base";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import FilterBar from "../components/filterBar";
import Pagination from "../components/pagination";
import Strapi from "../transport/strapi";
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
      <Layout>
        <FilterBar
          genres={genres}
          setFilter={this.setFilter}
          categoryFilter={categoryQuery}
          genreFilter={genreQuery}
        />
        <PostGrid>
          {posts.map((post, index) => (
            <PostPreview post={post} key={index} />
          ))}
        </PostGrid>
        <Pagination
          numPages={numPages}
          currentPage={pageQuery}
          onChangePage={this.changePage}
        />
      </Layout>
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
      field: "categories.slug",
      value: query.category
    });
  }
  const formattedGenreQuery = formatGenreQuery(query.genre);
  formattedGenreQuery.forEach(genre => {
    postParams.filters.push({
      field: "genres.slug",
      value: genre
    });
  });
  const posts = await Strapi.getEntries("posts", postParams);
  const postCount = await Strapi.getEntryCount("posts", postParams);
  const genres = await Strapi.getEntries("genres", {
    sort: { field: "name", order: "asc" }
  });
  return {
    posts,
    postCount,
    genres,
    genreQuery: formattedGenreQuery,
    categoryQuery: query.category,
    pageQuery: currentPage
  };
};

export default Home;
