export const { NODE_ENV, IS_SERVER } = process.env;
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';

export const RESOURCE_URL_PATH_PREFIX = process.env.RESOURCE_URL_PATH_PREFIX || '';
const { SSR_API_HOST } = process.env;

/**
 * @param {{}} vars
 */
export const initServerVars = (vars = {}) => {
  if (IS_DEVELOPMENT && !SSR_API_HOST) {
    throw new Error('SSR_API_HOST is not exists');
  }

  if (IS_PRODUCTION && !vars.SSR_API_HOST) {
    throw new Error('SSR_API_HOST is not exists');
  }
};
