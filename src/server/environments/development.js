import path from 'path';
import webpack from 'webpack';
import express from 'express';
import appRoot from 'app-root-path';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

/* @Constants */
import { RESOURCE_URL_PATH_PREFIX } from 'config';

const development = app => {
  /* @Webpack configs for dev */
  const clientDevConfig = require(path.join(appRoot.path, 'config', 'webpack.client.dev.js'));
  const serverDevConfig = require(path.join(appRoot.path, 'config', 'webpack.server.dev.js'));

  const compiler = webpack([clientDevConfig, serverDevConfig]);

  app.use(RESOURCE_URL_PATH_PREFIX, express.static(path.join(appRoot.path, 'src', 'static')));

  app.get('*', webpackDevMiddleware(compiler, clientDevConfig.devServer));
  app.get(
    '*',
    webpackHotMiddleware(compiler.compilers[0], {
      path: `${RESOURCE_URL_PATH_PREFIX}/__webpack_hmr`,
    })
  );
  app.get('*', webpackHotServerMiddleware(compiler));
};

export default development;
