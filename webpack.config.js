const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./js/index.js",
    // ui: "./js/ui.js",
  },
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
    compress: true,
    // open: true,
    open: ["colors_type.html", "form_elements.html"],
    port: 3000,
  },
  devtool: "inline-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/pug/UI_kit/colors_type.pug"),
      filename: "colors_type.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/pug/UI_kit/form_elements.pug"),
      filename: "form_elements.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename("css")}`,
    }),
  ],
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resousePath, context) => {
                return path.relative(path.dirname(resousePath), context + "/");
              },
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
