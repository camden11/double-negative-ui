const CITY_MAP = {
  boston: "Boston",
  "new-york": "New York",
  chicago: "Chicago",
  "washington-dc": "DC"
};

const getCityName = slug => CITY_MAP[slug];

export default getCityName;
