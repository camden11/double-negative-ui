import queryString from "query-string";

const getOptimizedImage = (src, { width, height }) => {
  let [url, search] = src.split("?");
  let parsed;
  if (search) {
    parsed = queryString.parse(search);
  } else {
    parsed = {};
  }
  if (width) {
    parsed.w = width;
  }
  if (height) {
    parsed.h = height;
  }
  if (!(width && height) && (width || height)) {
    parsed.fit = "clip";
  }
  return `${url}?${queryString.stringify(parsed)}`;
};

export default getOptimizedImage;
