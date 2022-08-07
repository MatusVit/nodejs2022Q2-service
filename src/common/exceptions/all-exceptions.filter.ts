import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from 'src/logging/logging.service';

const LOGGER_NAME = 'ExceptionsFilter';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private logger: LoggingService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {
    this.logger.setContext(LOGGER_NAME);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'INTERNAL SERVER ERROR';

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    if (exception instanceof HttpException === false) {
      this.logger.error(
        `Not HttpException: ${exception['message']} \n ${exception['stack']}`,
      );
    } else {
      this.logger.error(JSON.stringify(responseBody));
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
