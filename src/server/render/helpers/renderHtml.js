import path from 'path';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { renderToString } from 'react-dom/server';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

/* @Components */
import { App } from 'components/App';

/* @Helpers */
import { createHtmlPage } from './htmlPageTemplate';

const statsFile = path.resolve('dist/loadable-stats.json');

/**
 * @param {object} store - redux store
 * @param {string} url - request url
 * @param {object} context - router context
 * @returns {string}
 */
export const renderHtml = (store, url, context) => {
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] });
  const spriteContent = sprite.stringify();

  const jsx = extractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const renderedApp = renderToString(jsx);

  return createHtmlPage(renderedApp, extractor, store, spriteContent);
};
