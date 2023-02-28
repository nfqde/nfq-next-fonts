/* eslint-disable max-lines-per-function */
const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

const outputDirectory = 'dist';

module.exports = (env, argv = {mode: 'develpment'}) => ({
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/u,
                use: {loader: 'babel-loader'}
            },
            {
                loader: 'file-loader',
                options: {limit: 100},
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/u
            }
        ]
    },
    optimization: {
        chunkIds: (argv.mode === 'development') ? 'named' : 'deterministic',
        mergeDuplicateChunks: true,
        moduleIds: (argv.mode === 'development') ? 'named' : 'deterministic',
        nodeEnv: argv.mode,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        runtimeChunk: true
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.join(__dirname, outputDirectory),
        sourceMapFilename: '[file].map'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ids.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            favicon: './src/favicon.ico',
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(argv.mode)}),
        new NodePolyfillPlugin()
    ].filter(Boolean),
    resolve: {
        alias: {
            Classes: path.resolve(__dirname, 'src/classes/'),
            Components: path.resolve(__dirname, 'src/components/'),
            Fonts: path.resolve(__dirname, 'src/fonts/'),
            Images: path.resolve(__dirname, 'src/images/'),
            Stores: path.resolve(__dirname, 'src/stores/'),
            Utils: path.resolve(__dirname, 'src/utils/')
        },
        extensions: [
            '.js',
            '.jsx',
            '.css',
            '.png',
            '.jpeg',
            '.jpg',
            '.json',
            '.svg'
        ]
    },
    target: 'web'
});