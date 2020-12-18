import urlRegExp from 'regularExpressions/urlRegExp';

export const isHomePage = path => !!urlRegExp.HOME_PAGE.exec(path);
