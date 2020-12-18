import HttpStatus from 'http-status-codes';
import { createMemoryHistory } from 'history';
import configureStore from 'reduxStore/store';

import { isSsrRedirectError, isNotFoundError } from 'common/errors';

/* @Actions */
import { updateStatusCode } from 'reduxStore/app/actions';

/* @Helpers */
import { renderHtml } from './helpers/renderHtml';
import parseRequestOptions from './helpers/parseRequestOptions';

export default () => async (req, res) => {
  const { originalUrl } = parseRequestOptions(req);

  const context = {};

  const history = createMemoryHistory({ initialEntries: [originalUrl] });

  const store = configureStore(history);

  try {
    await console.log('All fine!');
  } catch (err) {
    if (isSsrRedirectError(err)) {
      return res.redirect(err.extra.httpCode, err.extra.url);
    }

    if (isNotFoundError(err)) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  let html = '';

  try {
    html = renderHtml(store, originalUrl, context);
  } catch (err) {
    store.dispatch(updateStatusCode(HttpStatus.INTERNAL_SERVER_ERROR));

    console.error(err);
  }

  if (context.url) {
    return res.redirect(context.url);
  }

  const { statusCode } = store.getState().app;

  return res.status(statusCode).send(`<!doctype html>${html}`);
};
