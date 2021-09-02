const webpack = require("webpack");
console.log(webpack.version); // 5.21.2
module.exports = {
  future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
};
