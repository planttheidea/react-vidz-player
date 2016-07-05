'use strict';

const path = require('path');
const webpack = require('webpack');
const defaultConfig = require('./webpack.config');

module.exports = Object.assign({}, defaultConfig, {
  cache: false,

  debug: false,

  devtool: undefined,

  module: Object.assign({}, defaultConfig.module, {
    loaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel',
        test: /\.js$/
      }, {
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.woff(\?.*)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?.*)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?.*)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?.*)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?.*)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }),

  output: Object.assign({}, defaultConfig.output, {
    filename: 'react-vidz-player.min.js'
  }),

  plugins: defaultConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        booleans: true,
        conditionals: true,
        drop_console: true,
        drop_debugger: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        warnings: false
      },
      sourceMap: false
    })
  ])
});