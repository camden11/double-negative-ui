const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  async exportPathMap(defaultPathMap) {
    return defaultPathMap;
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.plugins.push(new webpack.IgnorePlugin(/^encoding$/, /node-fetch/));
    return config;
  },
  target: "serverless"
};
