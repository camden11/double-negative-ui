import Strapi from "strapi-sdk-javascript";

const strapi = new Strapi(process.env.STRAPI_URL);
strapi.setToken(process.env.STRAPI_TOKEN);

export default strapi;
