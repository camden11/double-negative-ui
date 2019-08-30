import React, { Component } from "react";
import Router from "next/router";
import Layout from "../layouts/base";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import FilterBar from "../components/filterBar";
import Strapi from "../transport/strapi";

class Home extends Component {
  setFilter(category, genre) {
    Router.push({
      pathname: "/",
      query: { category, genre }
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
  const posts = await Strapi.getEntries("posts");
  const genres = await Strapi.getEntries("genres");
  return {
    posts,
    genres,
    genreQuery: formatGenreQuery(query.genre),
    categoryQuery: query.category
  };
};

export default Home;
