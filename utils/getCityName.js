const CITY_MAP = {
  boston: "Boston",
  "new-york": "New York",
  chicago: "Chicago",
  "washington-dc": "DC",
  "live-stream": "Concert Streams"
};

const getCityName = slug => CITY_MAP[slug];

export default getCityName;
