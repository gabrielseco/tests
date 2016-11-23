/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
const webpack = require('webpack');
const path    = require('path');

const join    = path.join;
const resolve = path.resolve;

const root    = resolve(__dirname);
const src     = join(root, 'src');

const ExtractTextPlugin = require('extract-text-webpack-plugin');




module.exports = {
  context:__dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  cache: true,
  debug: true,
  devtool: false,
  entry: [
    'webpack-dev-server/client?http://localhost:8000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/main.js'
  ],

  resolve:{
    root: root,
    extensions: ['', '.js', '.jsx'],
    alias:{

    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader','eslint-loader']
      },
    {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap')
    },
    {
        test: /\.css/,
        loader: "style-loader!css-loader"
    }
   ]
 },
 plugins: [
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoErrorsPlugin(),
   new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: '"development"'
     }
   }),
   new ExtractTextPlugin("styles.css")
 ],

};
