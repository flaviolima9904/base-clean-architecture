import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EnvConfigModule } from '@infra/config/env-config/env-config.module';
import { EnvConfigService } from '@infra/config/env-config/env.config.service';
import { NodeMailerService } from './node-mailer.service';
import { IMailerService } from '@application/adapters/mailer.interface';
import { LoggerModule } from '@infra/logger/logger.module';

@Module({
  imports: [
    EnvConfigModule,
    MailerModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (config: EnvConfigService) => {
        return {
          transport: {
            host: config.getMailHost(),
            port: config.getMailPort(),
            auth: {
              user: config.getMailAuthUser(),
              pass: config.getMailAuthPass(),
            },
          },
        };
      },
    }),
    LoggerModule,
  ],
  providers: [{ provide: IMailerService, useClass: NodeMailerService }],
  exports: [IMailerService],
})
export class NodeMailerModule {}
