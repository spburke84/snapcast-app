var path = require('path');

module.exports = {
    entry: ['babel-polyfill', __dirname + "/client/index.js"] ,
    output: {
        filename: 'bundle.js',
        path: __dirname,
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};