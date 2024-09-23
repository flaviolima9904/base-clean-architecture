import { ConsoleLogger, Injectable } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console({ level: 'info' })],
  });

  getContext(): string {
    return this.context;
  }

  info(message: string, ...params: any[]) {
    this.logger.info(`[${this.context}] ${message}`, ...params);
  }

  error(message: string, ...params: any[]) {
    this.logger.error(`[${this.context}] ${message}`, ...params);
  }
}
