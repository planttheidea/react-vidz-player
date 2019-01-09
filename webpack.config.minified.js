'use strict';

const path = require('path');
const webpack = require('webpack');
const defaultConfig = require('./webpack.config');

module.exports = Object.assign({}, defaultConfig, {
  devtool: undefined,

  mode: 'production',

  output: Object.assign({}, defaultConfig.output, {
    filename: 'react-vidz-player.min.js',
  }),
});
