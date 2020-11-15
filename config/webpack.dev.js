const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base_path = process.cwd();

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: `${base_path}/src/editor/index.tsx`,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
  },
  output: {
    filename: 'main.js',
    path: `${base_path}/dist/editor`,
  },
  devServer: {
    contentBase: '../dist',
    publicPath: '/',
  },
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: { auto: true },
            },
          },
        ],
      },
    ],
  },
};
