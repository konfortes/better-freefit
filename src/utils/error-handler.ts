import HttpStatus from 'http-status-codes';
import { CustomError, ErrorCode } from './errors-factory';
import { FastifyReply, FastifyRequest, FastifyError } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import logger from './logger';

function formatResponse(errorCode: ErrorCode, message: string) {
  return {
    error: {
      code: ErrorCode[errorCode],
      message
    }
  };
}

function logError(error) {
  if (!error.httpCode || error.httpCode >= 500) {
    logger.error(error);
  } else {
    logger.warn(error);
  }
}

export default function errorHandler(
  error: FastifyError,
  request: FastifyRequest<IncomingMessage>,
  reply: FastifyReply<ServerResponse>
) {
  logError(error);

  if (error instanceof CustomError) {
    reply.code(error.httpCode);
    reply.send(formatResponse(error.errorCode, error.message));
  } else {
    reply.code(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    reply.send(formatResponse(ErrorCode.Internal, 'Internal Server Error'));
  }
}
