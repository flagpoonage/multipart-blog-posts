const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base_path = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: `${base_path}/src/editor/client/index.tsx`,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
  },
  output: {
    filename: 'main.js',
    path: `${base_path}/dist/editor/client`,
  },
  devServer: {
    writeToDisk: true,
    historyApiFallback: true,
    contentBase: `${base_path}/dist/editor/client`,
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Blog Engine',
      template: `${base_path}/build/templates/editor-client.hbs`,
      inject: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        options: {
          configFile: `${base_path}/build/config/tsconfig.editor-client.json`,
        },
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
