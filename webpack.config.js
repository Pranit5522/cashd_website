const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require("fs");

// Load site data for Handlebars
const siteData = JSON.parse(fs.readFileSync("./data/site-data.json", "utf8"));

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "js/[name].[contenthash].js" : "js/[name].js",
      publicPath: "/",
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          options: {
            partialDirs: [path.join(__dirname, "templates", "partials")],
          },
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "assets/",
                publicPath: "/assets/",
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./templates/index.hbs",
        filename: "index.html",
        templateParameters: siteData,
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "css/[name].[contenthash].css",
            }),
          ]
        : []),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/assets",
            to: "assets",
            noErrorOnMissing: true,
          },
          {
            from: "public",
            to: ".",
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    resolve: {
      extensions: [".js", ".scss", ".css", ".hbs"],
    },
  };
};
