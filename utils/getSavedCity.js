import { parseCookies, setCookie } from "nookies";

const getSavedCity = ctx => {
  const { query } = ctx;
  const cookies = parseCookies(ctx);
  let city;
  if (cookies && !cookies["dn-city"]) {
    setCookie(ctx, "dn-city", "new-york");
    city = "new-york";
  } else if (cookies && cookies["dn-city"]) {
    city = cookies["dn-city"];
  }

  if (query.city) {
    city = query.city;
  }

  return city;
};

export default getSavedCity;
