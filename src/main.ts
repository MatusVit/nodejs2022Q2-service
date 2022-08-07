import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { dirname, join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';

const port = process.env.PORT || 4000;
const LOGGER_NAME = 'bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = new LoggingService();
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rootDirname = dirname(__dirname);
  const docAPI = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = load(docAPI);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => console.log(`Server started on port ${port}`));

  process
    .on('unhandledRejection', (reason, p) => {
      console.error(reason, 'Unhandled Rejection at Promise', p);
      logger.error(`Unhandled Rejection at Promise ${reason}`, LOGGER_NAME);
    })
    .on('uncaughtException', (error) => {
      console.error(error, 'Uncaught Exception thrown', LOGGER_NAME);
      logger.error(`Uncaught Exception thrown ${error}`);
      process.exit(1);
    });
}
bootstrap();
