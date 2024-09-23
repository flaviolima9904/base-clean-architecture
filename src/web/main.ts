import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as bodyParser from 'body-parser';

const _logger = new Logger('Bootstrap');

async function bootstrap() {
  global.offerTimeoutArray = [];

  const logger: LogLevel[] = ['log', 'warn', 'error'];
  if (process.env.DATABASE_DEBUG === 'true') logger.push('debug');

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });

  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
    logger,
  });

  app.use(bodyParser.json({ limit: '64mb' }));
  app.use(bodyParser.urlencoded({ limit: '64mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.APP_PORT || 3000;

  await app.listen(port);

  _logger.log(`Nest rodando na porta ${port}`);
}

bootstrap();
