import getCityName from "./getCityName";

const getPostFilterText = (genreFilter, page) => {
  const pageText = page && page > 1 ? ` (Page ${page})` : "";
  if (!genreFilter || genreFilter.length === 0) {
    return `All${pageText}`;
  }
  let filterText;
  if (genreFilter.length === 1) {
    filterText = genreFilter[0];
  } else if (genreFilter.length === 2) {
    filterText = genreFilter.join(" & ");
  } else if (genreFilter.length === 3) {
    filterText = `${genreFilter[0]}, ${genreFilter[1]}, and ${genreFilter[2]}`;
  } else {
    filterText = "Multiple Genres";
  }

  return `${filterText}${pageText}`;
};

const getShowFilterText = (genreFilter, cityFilter, homePage) => {
  const cityText = `shows in ${getCityName(cityFilter)}`;
  if (homePage) {
    return `Upcoming ${cityText}`;
  }
  return `${getPostFilterText(genreFilter)} ${cityText}`;
};

export { getPostFilterText, getShowFilterText };
