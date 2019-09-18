const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withImages = require("next-images");

module.exports = withImages({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.plugins.push(new webpack.IgnorePlugin(/^encoding$/, /node-fetch/));
    return config;
  },
  env: {
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    STRAPI_URL: process.env.STRAPI_URL
  }
});
