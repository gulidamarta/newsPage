var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    },
    stats: {
        colors: true
    }
};