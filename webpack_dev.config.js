const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.base');

const jsDir = process.env.npm_package_config_jsOut;

module.exports = function () {
    return webpackMerge(commonConfig(), {
        output: {
            filename: '[name].js',
        },
        plugins:   [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('dev')
            }),
        ],
    });
};
