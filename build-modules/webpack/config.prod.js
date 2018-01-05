const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-Webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, '../../dist');
const APP_DIR = path.resolve(__dirname, '../../src');

const copyWebPackConfig = [
    {from: path.resolve(__dirname, '../../package.json')},
    {from: path.resolve(__dirname, '../../build-modules/app')}
];
const config = {
    entry: APP_DIR + '/app.js',
    output: {
        path: BUILD_DIR,
        filename: 'client/scripts/client.[hash].js'
    },

    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
        new CleanWebpackPlugin(BUILD_DIR, {allowExternal: true}),
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../src/index.ejs'),
            title: 'XAVIER Online Quotes Tool',
            base: '/',
            inject: true,
        }),
        new CopyWebpackPlugin(copyWebPackConfig),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: './client/images/[hash]-[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./client/fonts/[name].[ext]'
            }
        ]
    },
};

module.exports = config;
