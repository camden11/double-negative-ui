const GENRE_MAP = {
  rock: "Rock",
  pop: "Pop",
  rap: "Rap",
  rb: "R&B",
  punk: "Punk",
  electronic: "Electronic",
  experimental: "Experimental",
  soul: "Soul",
  folk: "Folk"
};

const getGenreName = slug => GENRE_MAP[slug];

export default getGenreName;
