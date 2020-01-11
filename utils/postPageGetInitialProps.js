import Prismic from "prismic-javascript";
import PrismicClient from "../transport/prismic";
import allPostsQuery from "../queries/allPosts";
import constants from "../constants";

const formatGenreQuery = query => {
  if (!query) {
    return [];
  } else if (typeof query === "string") {
    return [query];
  } else {
    return query;
  }
};

const postPageGetInitialProps = categoryUid => {
  return async function getInitialProps({ query }) {
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

    if (categoryUid) {
      const categoryData = await PrismicClient.query(
        Prismic.Predicates.at("document.type", "category")
      );
      const categories = categoryData.results;
      categories.forEach(category => {
        if (category.uid === categoryUid) {
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
      category: categoryUid,
      pageQuery: currentPage
    };
  };
};

export default postPageGetInitialProps;
