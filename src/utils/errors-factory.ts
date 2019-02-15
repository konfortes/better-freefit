import HttpStatus from 'http-status-codes';

// All possible errors codes
export enum ErrorCode {
  Internal,
  Authentication
}

interface ErrorOptions {
  msg: string;
  errorCode: ErrorCode;
  httpCode: number;
}

export class CustomError extends Error {
  public errorCode: ErrorCode;
  public httpCode: number;

  constructor(opts: ErrorOptions) {
    super(opts.msg);

    this.httpCode = opts.httpCode;
    this.errorCode = opts.errorCode;
  }
}

// Example for application error
export const authenticationError = (msg = 'Authentication error') => {
  return new CustomError({
    errorCode: ErrorCode.Authentication,
    msg: msg,
    httpCode: HttpStatus.UNAUTHORIZED
  });
};
