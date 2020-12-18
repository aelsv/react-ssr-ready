const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp('src'),
  appDist: resolveApp('dist'),
  appClientJs: resolveApp('src/client.js'),
  appServerJs: resolveApp('src/server/render/index.js'),
  entry: resolveApp('src/store.js'),
  html: resolveApp('src/index.html'),
  styles: resolveApp('src/styles'),
  appNodeModules: resolveApp('node_modules'),
};
