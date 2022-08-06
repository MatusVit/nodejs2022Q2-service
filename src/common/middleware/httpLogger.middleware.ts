import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

const LOGGER_NAME = 'HTTP';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {
    this.logger.setContext(LOGGER_NAME);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl, method, body, params } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `[${method} ${originalUrl}] PARAMS:${params[0]} BODY:${JSON.stringify(
          body,
        )} PARAMS:${params[0]} => Status:${statusCode}`,
      );
    });

    next();
  }
}
