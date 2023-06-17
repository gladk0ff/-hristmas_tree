"use strict";
const path = require('path');
const webpack  = require('webpack')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports=(env,argv)=> {
    const NODE_ENV = argv.mode;
    process.env.NODE_ENV = NODE_ENV;
    const isDev = NODE_ENV === "development";
    const CONFIG_OBJ = isDev ? require("./dev.conf.js"):require("./base.conf.js")

    const API_SERVICE_URL = CONFIG_OBJ.API_SERVICE_URL || ''

    return {
        context: path.resolve(__dirname, "src/"),
        entry: './index.tsx',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['...', '.ts', '.tsx', '.jsx'],
            alias: {
                assets: path.resolve(__dirname, 'src/assets'),
                components: path.resolve(__dirname, 'src/components'),
            },
        },
        devtool: isDev ? 'source-map' : false,
        plugins: [
            new HtmlWebpackPlugin({}),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                "process.env":{
                    API_SERVICE_URL:JSON.stringify(API_SERVICE_URL)
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpeg|jpg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(t|j)sx?$/i,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ],
        },
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            hot: 'only',
        },
    }
};
