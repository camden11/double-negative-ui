const getPostFilterText = (genreFilter, category) => {
  if (!category && (!genreFilter || genreFilter.length === 0)) {
    return "All Stories";
  }
  let pluralizedCategory;
  if (category && category[category.length - 1] !== "s") {
    pluralizedCategory = `${category}s`;
  } else {
    pluralizedCategory = category;
  }
  if (genreFilter.length === 0) {
    return pluralizedCategory;
  } else if (genreFilter.length === 1) {
    const categoryText = pluralizedCategory ? `${pluralizedCategory}` : "";
    return `${genreFilter[0]} ${categoryText}`;
  } else if (genreFilter.length === 2) {
    const categoryText = pluralizedCategory ? `${pluralizedCategory}` : "";
    return `${genreFilter.join(" & ")} ${categoryText}`;
  } else if (genreFilter.length === 3) {
    const categoryText = pluralizedCategory ? `${pluralizedCategory}: ` : "";
    const genreText = `${genreFilter[0]}, ${genreFilter[1]}, and ${genreFilter[2]}`;
    return `${categoryText}${genreText}`;
  } else {
    const categoryText = pluralizedCategory ? `${pluralizedCategory}: ` : "";
    return `${categoryText}Multiple Genres`;
  }
};

const getShowFilterText = (genreFilter, cityFilter) => {
  return "Upcoming shows in New York";
};

export { getPostFilterText, getShowFilterText };
