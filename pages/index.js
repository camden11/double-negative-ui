import React, { Component } from "react";
import Router from "next/router";
import Layout from "../layouts/base";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import FilterBar from "../components/filterBar";
import Strapi from "../transport/strapi";

class Home extends Component {
  setFilter(category, genre) {
    const query = {};
    if (category) {
      query.category = category;
    }
    if (genre && genre.length > 0) {
      query.genre = genre;
    }
    Router.push({
      pathname: "/",
      query
    });
  }

  render() {
    const { posts, genres, genreQuery, categoryQuery } = this.props;
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
  const postParams = {
    sort: {
      field: "createdAt",
      order: "desc"
    },
    filters: []
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
  const genres = await Strapi.getEntries("genres");
  return {
    posts,
    genres,
    genreQuery: formattedGenreQuery,
    categoryQuery: query.category
  };
};

export default Home;
