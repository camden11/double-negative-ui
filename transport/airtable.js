import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID)("shows");

const fetchShows = async (city, numShows) => {
  const shows = await base
    .select({ maxRecords: numShows, filterByFormula: `{City UID} = '${city}'` })
    .all();
  return shows;
};

export default { fetchShows };
