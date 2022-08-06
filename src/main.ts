import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { dirname, join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './logging/logging.Service';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    // logger: console,
    // logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.useLogger(app.get(AppLogger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rootDirname = dirname(__dirname);
  const docAPI = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = load(docAPI);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
