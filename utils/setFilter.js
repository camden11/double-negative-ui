import Router from "next/router";

const setFilter = (category, genre, page) => {
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
};

export default setFilter;
