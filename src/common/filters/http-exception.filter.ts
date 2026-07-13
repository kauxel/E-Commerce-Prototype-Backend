import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let errors: string[] | undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        const errorResponse = exceptionResponse as {
          message?: string | string[];
          error?: string;
        };

        if (Array.isArray(errorResponse.message)) {
          errors = errorResponse.message;
          message = 'Validation failed';
        } else {
          message =
            typeof errorResponse.message === 'string'
              ? errorResponse.message
              : errorResponse.error ?? message;
        }
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      errors,
    });
  }
}