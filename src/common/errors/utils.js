import HttpStatus from 'http-status-codes';
import { CustomError } from './CustomError';
import { ERROR_CODES } from './constants';

export const isSsrRedirectError = error => error instanceof CustomError && error.errorId === ERROR_CODES.SSR_REDIRECTED;
export const isRedirectError = error => error instanceof CustomError && error.errorId === ERROR_CODES.REDIRECTED;
export const isNotFoundError = error =>
  error instanceof CustomError && error?.extra?.error?.status === HttpStatus.NOT_FOUND;
