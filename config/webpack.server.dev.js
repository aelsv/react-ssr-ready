const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { getServerEnvironment } = require('./env');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const env = getServerEnvironment();

module.exports = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  mode: 'development',
  entry: paths.appServerJs,
  devtool: 'inline-source-map',
  output: {
    filename: 'dev-server-bundle.js',
    chunkFilename: '[name].js',
    path: paths.appDist,
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      env.raw.NODE_PATH.split(path.delimiter).filter(Boolean),
      paths.appSrc
    ),
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              '@babel/env',
              {
                useBuiltIns: 'entry',
                modules: 'commonjs',
                corejs: 3,
              },
            ],
          ],
          plugins: ['react-hot-loader/babel'],
        },
      },
      /* STYLE LOADER */
      {
        oneOf: [
          {
            test: /\.css$/,
            include: /node_modules/,
            use: [
              ExtractCssChunks.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                },
              },
            ],
          },
          {
            test: /\.(css|scss)$/,
            use: [
              ExtractCssChunks.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  localIdentName: '[name]_[local]__[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [autoprefixer()],
                  sourceMap: true,
                },
              },
              { loader: 'resolve-url-loader' },
              {
                loader: 'sass-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  sourceMapContents: false,
                  localIdentName: '[name]_[local]__[hash:base64:5]',
                },
              },
            ],
          },
        ],
      },
      /* FONTS */
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      /* SVG ICONS */
      {
        test: /\.svg$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [{ removeAttrs: { attrs: '*:fill:none' } }],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.definedPlugin),
    new ExtractCssChunks({
      hot: true,
      cssModules: true,
    }),
    new LoadablePlugin(),
  ],
  performance: { hints: false },
};
