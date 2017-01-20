var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    main: [
      'webpack-hot-middleware/client?noInfo=true&reload=true',
      path.resolve(__dirname, 'config/index.js')
    ]
  },
  output: {
    path: path.join(__dirname, "/bundle2"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
    publicPath: "http://localhost:3000/bundle2/",
  },
  externals: {
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: path.resolve(__dirname, './node_modules/'),
        loader: 'jsx-loader'
      }, {
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, './node_modules/'),
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'index.html'),
      template: path.resolve(__dirname, './app/public/dev.html'),
      inject: 'body',
      hash: true,
      cache: true,
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("developement")
      }
    })
  ]
};