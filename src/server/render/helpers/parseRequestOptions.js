/* @Libs */
import url from 'url';

/**
 * @param {Request} request - express request
 * @return {{serverOptions: object, originalUrl: string, searchString: string}}
 */
export default function parseRequestOption(request) {
  const { originalUrl, host } = request;
  const serverOptions = {
    headers: {},
  };

  const { search } = url.parse(originalUrl);
  const searchString = !!search ? search : '';

  return {
    serverOptions,
    originalUrl,
    searchString,
    host,
  };
}
