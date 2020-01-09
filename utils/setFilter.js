import Router from "next/router";

const setFilter = (city, genre, page) => {
  const query = {};
  if (city) {
    query.city = city;
  }
  if (genre && genre.length > 0) {
    query.genre = genre;
  }
  if (page) {
    query.page = page;
  }
  Router.push({
    pathname: Router.asPath.split("?")[0],
    query
  });
};

export default setFilter;
