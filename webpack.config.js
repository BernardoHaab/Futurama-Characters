const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/pages/index/index.js",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/pages/index/index.html",
    }),
  ],
};
