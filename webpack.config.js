const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./client/src/index.jsx"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "client/dist")
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
};