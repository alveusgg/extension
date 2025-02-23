import { basename, dirname, join } from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ZipWebpackPlugin from "zip-webpack-plugin";
import dotenv from "dotenv";

import webpack from "webpack";
import "webpack-dev-server";

const isDev = process.env.NODE_ENV === "development";

const env = {
  ...dotenv.config({ path: "./.env" }).parsed,
  ...(isDev && dotenv.config({ path: "./.env.development" }).parsed),
};

const getTypeScriptLoader = () => ({
  loader: "ts-loader",
  options: {
    getCustomTransformers: () => ({
      before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    }),
    transpileOnly: true,
  },
});

const getStyleLoader = () => [
  isDev
    ? "style-loader"
    : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: "../../",
        },
      },
  {
    loader: "css-loader",
    options: {
      modules: false,
      sourceMap: true,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: ["@tailwindcss/postcss"],
      },
      sourceMap: true,
    },
  },
];

const config: webpack.Configuration = {
  // Set the mode based on the environment
  mode: isDev ? "development" : "production",
  devtool: isDev ? "cheap-module-source-map" : "source-map",
  // Create a development server (using https to allow chat connection)
  devServer: {
    open: true,
    hot: true,
    server: {
      type: "https",
    },
    client: {
      overlay: {
        errors: true,
        warnings: true,
        // No overlay for runtime errors, like chat connections being killed
        runtimeErrors: false,
      },
    },
  },
  // We need three entry points, and three outputs w/ html
  entry: {
    panel: "./src/pages/panel/index.tsx",
    mobile: "./src/pages/panel/index.tsx",
    overlay: "./src/pages/overlay/index.tsx",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/template.html",
      filename: "panel.html",
      chunks: ["panel"],
      templateParameters: {
        process: {
          env,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/template.html",
      filename: "mobile.html",
      chunks: ["mobile"],
      templateParameters: {
        process: {
          env,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "src/template.html",
      filename: "video_overlay.html",
      chunks: ["overlay"],
      templateParameters: {
        process: {
          env,
        },
      },
    }),
    // Include the public directory
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
    // Load environment variables as a single object
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
    // Enforce type checking on a separate process
    new ForkTsCheckerWebpackPlugin(),
    // Enable react hot reloading in development
    isDev &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
    // Dedicated CSS files in production
    !isDev &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
    // Zip the build for easy distribution
    !isDev &&
      new ZipWebpackPlugin({
        filename: "build.zip",
      }),
  ].filter(Boolean),
  output: {
    path: join(process.cwd(), "build"),
    filename: isDev
      ? "static/js/[name].js"
      : "static/js/[name].[contenthash:8].js",
    chunkFilename: isDev
      ? "static/js/[name].chunk.js"
      : "static/js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    publicPath: isDev ? "auto" : "./",
    clean: !isDev,
  },
  // Ensure compatibility based on browserslist
  target: "browserslist",
  // Setup loaders for all our file types
  module: {
    rules: [
      // Load typescript
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: getTypeScriptLoader(),
      },
      // Load typescript in @alveusgg packages
      {
        test: /\.tsx?$/,
        include: new RegExp(
          join("node_modules", "@alveusgg").replace(/\\/g, "\\\\"),
        ),
        use: getTypeScriptLoader(),
      },
      // Load tailwind
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: getStyleLoader(),
      },
      // Load images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        type: "asset",
      },
      // Load ambassador images in @alveusgg packages
      {
        test: /\.(png|jpe?g)$/,
        include: [
          new RegExp(
            join(
              "node_modules",
              "@alveusgg",
              "data",
              "build",
              "assets",
              "ambassadors",
            ).replace(/\\/g, "\\\\"),
          ),
          new RegExp(join("src", "assets", "winston").replace(/\\/g, "\\\\")),
        ],
        type: "asset",
        generator: {
          filename: (pathData) => {
            if (!pathData.filename) return "";
            const dir = basename(dirname(pathData.filename));
            return `static/media/ambassadors/${dir}/[name].[contenthash][ext]`;
          },
        } as webpack.WebpackOptionsNormalized["module"]["generator"]["asset"],
        use: [
          {
            loader: "webpack-image-resize-loader",
            options: {
              width: 550,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  // Disable any minification
  optimization: {
    minimize: false,
  },
};

export default config;
