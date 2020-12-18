const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const { getClientEnvironment } = require('./env');
const SvgStore = require('webpack-svgstore-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const createProgressPluginHandler = require('./createProgressPluginHandler');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const env = getClientEnvironment();
const RESOURCE_URL_PATH_PREFIX = env.raw.RESOURCE_URL_PATH_PREFIX || '/';
const webpackHotEntry = 'webpack-hot-middleware/client?reload=false&dynamicPublicPath=true';

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    app: [require.resolve('./polyfills'), 'react-hot-loader/patch', webpackHotEntry, paths.appClientJs],
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: paths.appDist,
    publicPath: RESOURCE_URL_PATH_PREFIX,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: false,
      },
    },
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      env.raw.NODE_PATH.split(path.delimiter).filter(Boolean),
      paths.appSrc
    ),
    alias: {
      styles: paths.styles,
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.json', '.jsx'],
  },
  devServer: {
    hot: true,
    overlay: true,
    serverSideRender: true,
    stats: {
      all: false,
      modules: true,
      errors: true,
      warnings: true,
      logging: 'warn',
      colors: true,
      builtAt: true,
    },
    historyApiFallback: true,
    watchOptions: { ignored: ignoredFiles(paths.appSrc) },
    contentBase: paths.appDist,
    publicPath: '/',
    writeToDisk: true,
  },
  module: {
    rules: [
      /* JSX LOADER */
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
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
              {
                loader: ExtractCssChunks.loader,
                options: {
                  hmr: true,
                  reloadAll: false,
                },
              },
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
                  plugins: () => [require('autoprefixer')],
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
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(env.definedPlugin),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractCssChunks({
      ignoreOrder: true,
    }),
    new SvgStore(),
    new LoadablePlugin(),
    new webpack.ProgressPlugin({
      entries: false,
      activeModules: false,
      handler: createProgressPluginHandler(),
    }),
  ],
  performance: { hints: false },
};
