import React, { Component } from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import FilterBar from "../components/filterBar";
import Pagination from "../components/pagination";
import PrismicClient from "../transport/prismic";
import allPostsQuery from "../queries/allPosts";
import setFilter from "../utils/setFilter";
import constants from "../constants";

class AllStories extends Component {
  changePage = page => {
    const { genreQuery, categoryQuery } = this.props;
    setFilter(categoryQuery, genreQuery, page);
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
          <title>All Stories | Double Negative</title>
          <meta
            name="description"
            content="All albums, tracks, shows, and features on Double Negative."
          />
          <meta property="og:title" content="All Stories | Double Negative" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="http://doublenegative.cc/all-stories"
          />
          <meta property="og:image" content="/public/og_image.png" />
        </Head>
        <div className="container">
          <FilterBar
            genres={genres}
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
        </div>
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

AllStories.getInitialProps = async function({ query }) {
  const currentPage = query.page ? +query.page : 1;
  const predicates = [Prismic.Predicates.at("document.type", "post")];

  const formattedGenreQuery = formatGenreQuery(query.genre);
  const genreData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "genre"),
    { orderings: "[my.genre.name]" }
  );
  const genres = genreData.results;
  if (formattedGenreQuery.length > 0) {
    const genreIds = [];
    genres.forEach(genre => {
      if (formattedGenreQuery.includes(genre.uid)) {
        genreIds.push(genre.id);
      }
    });
    predicates.push(Prismic.Predicates.any("my.post.genres.genre", genreIds));
  }

  const categoryQuery = query.category;
  const categoryData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "category")
  );
  const categories = categoryData.results;
  if (categoryQuery) {
    categories.forEach(category => {
      if (category.uid === categoryQuery) {
        predicates.push(
          Prismic.Predicates.at("my.post.categories.category", category.id)
        );
      }
    });
  }

  const postData = await PrismicClient.query(predicates, {
    pageSize: constants.POST_LIMIT,
    page: currentPage,
    orderings: "[document.first_publication_date desc]",
    graphQuery: allPostsQuery
  });
  const postCount = postData.total_results_size;

  return {
    posts: postData.results,
    postCount,
    genres,
    genreQuery: formattedGenreQuery,
    categoryQuery: query.category,
    pageQuery: currentPage
  };
};

export default AllStories;
