import React from "react";
import Prismic from "prismic-javascript";
import PrismicClient from "../transport/prismic";
import AirtableClient from "../transport/airtable";
import FilterBar from "../components/filterBar";
import ShowGrid from "../components/showGrid";
import ShowPreview from "../components/showPreview";
import getSavedCity from "../utils/getSavedCity";

const Shows = ({ shows, cities, city, genres, genreQuery }) => {
  return (
    <>
      <div className="container">
        <h1 className="page-title">Shows</h1>
        <FilterBar
          postMode={false}
          cities={cities}
          cityFilter={city}
          genreFilter={genreQuery}
          genres={genres}
        />
        <ShowGrid>
          {shows.map((show, index) => (
            <ShowPreview show={show} key={index} genreQuery={genreQuery} />
          ))}
        </ShowGrid>
      </div>
    </>
  );
};

const formatGenreQuery = query => {
  if (!query) {
    return [];
  } else if (typeof query === "string") {
    return [query];
  } else {
    return query;
  }
};

Shows.getInitialProps = async ctx => {
  const city = getSavedCity(ctx);

  const cityData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "city"),
    {
      orderings: "[my.city.name]"
    }
  );

  const formattedGenreQuery = formatGenreQuery(ctx.query.genre);
  const genreData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "genre"),
    { orderings: "[my.genre.name]" }
  );
  const genres = genreData.results;

  const shows = await AirtableClient.fetchShows(city, 50, formattedGenreQuery);

  return {
    city,
    cities: cityData.results,
    shows,
    genres,
    genreQuery: formattedGenreQuery
  };
};

export default Shows;
