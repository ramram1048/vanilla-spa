const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watch } = require('chokidar');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    before: (app, server) => {
      watch([
        `${__dirname}/src/view`,
      ]).on('all', () => {
        server.sockWrite(server.sockets, 'content-changed')
      })
    },
    contentBase: `${__dirname}/dist`,
  },
  entry: [
    `${__dirname}/src/App.js`,
  ],
  output: {
    filename: '[name].[hash].js',
    path: `${__dirname}/dist`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/view/index.ejs`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
