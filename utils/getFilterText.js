import getCityName from "./getCityName";

const getPostFilterText = genreFilter => {
  if (!genreFilter || genreFilter.length === 0) {
    return "All";
  }
  if (genreFilter.length === 1) {
    return genreFilter[0];
  } else if (genreFilter.length === 2) {
    return genreFilter.join(" & ");
  } else if (genreFilter.length === 3) {
    return `${genreFilter[0]}, ${genreFilter[1]}, and ${genreFilter[2]}`;
  } else {
    return "Multiple Genres";
  }
};

const getShowFilterText = (genreFilter, cityFilter, homePage) => {
  const cityText = `shows in ${getCityName(cityFilter)}`;
  if (homePage) {
    return `Upcoming ${cityText}`;
  }
  return `${getPostFilterText(genreFilter)} ${cityText}`;
};

export { getPostFilterText, getShowFilterText };
