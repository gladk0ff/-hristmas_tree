"use strict";
const path = require("path");
const webpack = require("webpack");
const { API_SERVICE_URL, CURRENT_YEAR } = require("./app.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
	const NODE_ENV = argv.mode;
	process.env.NODE_ENV = NODE_ENV;
	const isDev = NODE_ENV === "development";
	const isProd = !isDev;

	return {
		context: path.resolve(__dirname, "src/"),
		entry: "./index.tsx",
		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "dist"),
		},
		resolve: {
			extensions: ["...", ".ts", ".tsx", ".jsx"],
			alias: {
				["@assets"]: path.resolve(__dirname, "src/assets"),
				["@components"]: path.resolve(__dirname, "src/components"),
			},
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
			minimizer: isProd ? [new CssMinimizerPlugin()] : [],
		},
		devtool: isDev ? "source-map" : false,
		plugins: [
			new HtmlWebpackPlugin({
				title: "Новогодняя ёлка",
				favicon: "assets/logo.svg",
				meta: {
					"http-equiv": "Content-Security-Policy",
					content: {
						"default-src": "'self'",
						"script-src": "'self' 'unsafe-inline'",
						"style-src": "'self' 'unsafe-inline'",
						"img-src": "'self' data:",
						"connect-src": "'self'",
						"font-src": "'self'",
					},
				},
			}),
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({
				"process.env": {
					API_SERVICE_URL: JSON.stringify(API_SERVICE_URL),
					CURRENT_YEAR: JSON.stringify(CURRENT_YEAR),
				},
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[name].css",
			}),
		].filter(Boolean),
		module: {
			rules: [
				{
					test: /\.(png|svg|jpeg|jpg)$/i,
					type: "asset/resource",
				},
				{
					test: /\.css$/i,
					use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
				},
				{
					test: /\.(t|j)sx?$/i,
					exclude: /node_modules/,
					use: "babel-loader",
				},
			],
		},
		devServer: {
			static: path.resolve(__dirname, "dist"),
			hot: "only",
		},
	};
};
