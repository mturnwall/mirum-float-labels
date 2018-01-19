const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./webpack.base');

module.exports = function () {
    return webpackMerge(commonConfig(), {
        output: {
            filename: '[name].min.js',
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        beautify: false,
                    },
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
            }),
        ]
    });
};
