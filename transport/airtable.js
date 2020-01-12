import Airtable from "airtable";
import moment from "moment";
import _ from "lodash";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID)("shows");

const getGenreQuery = genres => {
  if (genres && genres.length > 0) {
    const searchQueries = genres.map(
      genre => `SEARCH('${genre}', {Genre UIDs})`
    );
    if (genres.length === 1) {
      return `, ${searchQueries[0]}`;
    } else {
      return `, OR(${searchQueries.join(",")})`;
    }
  }
  return "";
};

const getDedup = show => {
  if (show) {
    return `, RECORD_ID() != '${_.get(show, "id")}'`;
  }
  return "";
};

const fetchShows = async (city, numShows, genres, dedup) => {
  const shows = await base
    .select({
      view: "Calendar",
      maxRecords: numShows,
      filterByFormula: `AND({City UID} = '${city}', IS_AFTER({Date}, TODAY())${getGenreQuery(
        genres
      )}${getDedup(dedup)})`
    })
    .all();
  return shows;
};

const fetchShow = async id => {
  const show = await base.find(id);
  return show;
};

export default { fetchShows, fetchShow };
